#!/usr/bin/env node
/**
 * convert-polygons.js
 *
 * Converts SimpleMaps SVG polygon paths from citymap.js into a GeoJSON
 * FeatureCollection of Lincoln, Nebraska neighborhoods.
 *
 * Projection (SimpleMaps Mercator):
 *   x = 4602.0276 * lng + 445518.9393
 *   y = -263677.2977 * lat_mercator + 206496.5812
 *
 * Inverse:
 *   lng = (x - 445518.9393) / 4602.0276
 *   lat_mercator = (206496.5812 - y) / 263677.2977
 *   lat_radians  = 2 * atan(exp(lat_mercator)) - pi/2
 *   lat          = lat_radians * 180 / pi
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 1. Configuration
// ---------------------------------------------------------------------------

const CITYMAP_PATH = path.resolve(__dirname, '../html5citymapv4.5/citymap.js');
const MAPDATA_PATH = path.resolve(__dirname, '../html5citymapv4.5/mapdata.js');
const OUTPUT_PATH  = path.resolve(__dirname, '../content/geo/neighborhoods.geojson');

// Neighborhoods with existing JSON data files
const NEIGHBORHOOD_JSON_DIR = path.resolve(__dirname, '../content/neighborhoods');

// Slug overrides (SimpleMaps ID -> slug)
const SLUG_OVERRIDES = {
  '11103': 'colonial-hills',
  '11130': 'near-south',
  '11132': 'country-club',
  '11107': 'university-place',
  '11129': 'east-campus',
  '11135': 'havelock',
  '11136': 'downtown',
  '15100': 'haymarket-district',
  '11125': 'far-south',
  '11124': 'hitching-post-hills',
  '11122': 'watertower-yankee-hill',
  '11100': 'belmont',
  '11101': 'high-ridge-cushman',
};

// Segment overrides by slug
const SEGMENT_OVERRIDES = {
  'colonial-hills': 'Mid-Range',
  'near-south':     'Investment',
  'country-club':   'Established',
};

// ---------------------------------------------------------------------------
// 2. Projection helpers
// ---------------------------------------------------------------------------

function pixelToLngLat(x, y) {
  const lng = (x - 445518.9393) / 4602.0276;
  const latMercator = (206496.5812 - y) / 263677.2977;
  const latRadians  = 2 * Math.atan(Math.exp(latMercator)) - Math.PI / 2;
  const lat = latRadians * 180 / Math.PI;
  return [
    Math.round(lng * 1e6) / 1e6,
    Math.round(lat * 1e6) / 1e6,
  ];
}

// ---------------------------------------------------------------------------
// 3. SVG path parser
// ---------------------------------------------------------------------------

/**
 * Parse an SVG path string that uses M (absolute moveto), m (relative moveto),
 * l (relative lineto), and z/Z (close path).
 *
 * Returns an array of subpath coordinate arrays (pixel coords).
 * Each subpath is an array of [x, y] pairs.
 */
function parseSvgPath(d) {
  const subpaths = [];
  let currentX = 0;
  let currentY = 0;
  let subpathStartX = 0;
  let subpathStartY = 0;
  let currentSubpath = [];

  // Tokenize: split into commands. Each command is a letter followed by numbers.
  // We need to handle the case where numbers can be negative (e.g., "l0.32 46.69-0.4 1.04")
  // Split on command letters while keeping them
  const tokens = d.match(/[MmlzZ][^MmlzZ]*/g);

  if (!tokens) return [];

  for (const token of tokens) {
    const cmd = token[0];
    const rest = token.slice(1).trim();

    if (cmd === 'z' || cmd === 'Z') {
      // Close path - add start point to close the polygon
      if (currentSubpath.length > 0) {
        currentSubpath.push([subpathStartX, subpathStartY]);
        subpaths.push(currentSubpath);
        currentSubpath = [];
      }
      currentX = subpathStartX;
      currentY = subpathStartY;
      continue;
    }

    // Parse coordinate pairs from the rest of the token
    const coords = parseCoordPairs(rest);

    if (cmd === 'M') {
      // Absolute moveto - first pair is moveto, subsequent pairs are implicit lineto
      if (currentSubpath.length > 0) {
        subpaths.push(currentSubpath);
      }
      for (let i = 0; i < coords.length; i++) {
        currentX = coords[i][0];
        currentY = coords[i][1];
        if (i === 0) {
          subpathStartX = currentX;
          subpathStartY = currentY;
          currentSubpath = [[currentX, currentY]];
        } else {
          currentSubpath.push([currentX, currentY]);
        }
      }
    } else if (cmd === 'm') {
      // Relative moveto - first pair is relative move, subsequent pairs are implicit relative lineto
      if (currentSubpath.length > 0) {
        subpaths.push(currentSubpath);
      }
      for (let i = 0; i < coords.length; i++) {
        currentX += coords[i][0];
        currentY += coords[i][1];
        if (i === 0) {
          subpathStartX = currentX;
          subpathStartY = currentY;
          currentSubpath = [[currentX, currentY]];
        } else {
          currentSubpath.push([currentX, currentY]);
        }
      }
    } else if (cmd === 'l') {
      // Relative lineto
      for (const [dx, dy] of coords) {
        currentX += dx;
        currentY += dy;
        currentSubpath.push([currentX, currentY]);
      }
    }
  }

  // If subpath wasn't closed with z, push it anyway
  if (currentSubpath.length > 0) {
    subpaths.push(currentSubpath);
  }

  return subpaths;
}

/**
 * Parse coordinate pairs from an SVG path data string.
 * Handles formats like: "0.32 46.69 0.08 10.91-0.4 1.04"
 * Numbers can be separated by spaces, commas, or just by the negative sign.
 */
function parseCoordPairs(str) {
  if (!str || str.trim() === '') return [];

  // Match all numbers (including negative and decimal)
  const numbers = str.match(/-?\d*\.?\d+/g);
  if (!numbers) return [];

  const pairs = [];
  for (let i = 0; i < numbers.length; i += 2) {
    if (i + 1 < numbers.length) {
      pairs.push([parseFloat(numbers[i]), parseFloat(numbers[i + 1])]);
    }
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// 4. Extract data from citymap.js
// ---------------------------------------------------------------------------

function extractPaths(citymapContent) {
  // Find the paths object: paths: { "11100": "M...", ... }
  // We look for paths: { and then match to the closing }, names:
  const pathsMatch = citymapContent.match(/paths:\s*\{(.+?)\},\s*names:/s);
  if (!pathsMatch) {
    throw new Error('Could not find paths object in citymap.js');
  }
  const pathsStr = '{' + pathsMatch[1] + '}';
  return JSON.parse(pathsStr);
}

function extractNames(citymapContent) {
  // Find names: { "11100": "Belmont", ... }
  // The names object is a flat string-to-string map, so no nested braces.
  const namesMatch = citymapContent.match(/names:\s*\{([^}]+)\}/);
  if (!namesMatch) {
    throw new Error('Could not find names object in citymap.js');
  }
  const namesStr = '{' + namesMatch[1] + '}';
  return JSON.parse(namesStr);
}

// ---------------------------------------------------------------------------
// 5. Generate slug from name
// ---------------------------------------------------------------------------

function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// 6. Load existing neighborhood market data
// ---------------------------------------------------------------------------

function loadMarketData() {
  const data = {};
  const jsonFiles = ['colonial-hills.json', 'near-south.json', 'country-club.json'];

  for (const filename of jsonFiles) {
    const filePath = path.join(NEIGHBORHOOD_JSON_DIR, filename);
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const slug = content.slug || filename.replace('.json', '');
        data[slug] = {
          medianPrice:     content.market?.medianPrice || 0,
          priceChange:     content.market?.medianPriceChange || 0,
          averageDom:      content.market?.averageDom || 0,
          activeInventory: content.market?.activeInventory || 0,
        };
      } catch (e) {
        console.warn(`Warning: could not parse ${filename}: ${e.message}`);
      }
    }
  }
  return data;
}

// ---------------------------------------------------------------------------
// 7. Main conversion
// ---------------------------------------------------------------------------

function main() {
  console.log('Reading citymap.js...');
  const citymapContent = fs.readFileSync(CITYMAP_PATH, 'utf-8');

  console.log('Extracting paths and names...');
  const paths = extractPaths(citymapContent);
  const names = extractNames(citymapContent);

  console.log(`Found ${Object.keys(paths).length} paths and ${Object.keys(names).length} names`);

  console.log('Loading existing market data...');
  const marketData = loadMarketData();
  console.log(`Loaded market data for: ${Object.keys(marketData).join(', ')}`);

  const features = [];

  for (const [id, svgPath] of Object.entries(paths)) {
    const name = names[id] || `Unknown (${id})`;
    const slug = SLUG_OVERRIDES[id] || nameToSlug(name);

    // Parse SVG path into subpaths (pixel coordinates)
    const subpaths = parseSvgPath(svgPath);

    if (subpaths.length === 0) {
      console.warn(`Warning: no coordinates found for ${id} (${name})`);
      continue;
    }

    // Find the largest subpath by number of points (main boundary)
    let mainSubpath = subpaths[0];
    for (const sp of subpaths) {
      if (sp.length > mainSubpath.length) {
        mainSubpath = sp;
      }
    }

    // Convert pixel coordinates to lng/lat
    const coordinates = mainSubpath.map(([px, py]) => pixelToLngLat(px, py));

    // Ensure polygon is closed (first point = last point)
    if (coordinates.length > 0) {
      const first = coordinates[0];
      const last  = coordinates[coordinates.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coordinates.push([...first]);
      }
    }

    // Determine segment and market data
    const segment     = SEGMENT_OVERRIDES[slug] || 'Unassigned';
    const market      = marketData[slug] || {};
    const medianPrice     = market.medianPrice || 0;
    const priceChange     = market.priceChange || 0;
    const averageDom      = market.averageDom || 0;
    const activeInventory = market.activeInventory || 0;

    // Build GeoJSON Feature
    const feature = {
      type: 'Feature',
      properties: {
        id,
        name,
        slug,
        segment,
        medianPrice,
        priceChange,
        averageDom,
        activeInventory,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates],  // GeoJSON Polygon uses array of rings
      },
    };

    features.push(feature);
  }

  // Build FeatureCollection
  const geojson = {
    type: 'FeatureCollection',
    features,
  };

  // Write output
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(geojson, null, 2), 'utf-8');

  console.log(`\nWrote ${features.length} neighborhood features to:`);
  console.log(`  ${OUTPUT_PATH}`);

  // Validation summary
  console.log('\n--- Validation Summary ---');
  console.log(`Total features: ${features.length}`);

  let hasErrors = false;
  for (const f of features) {
    const coords = f.geometry.coordinates[0];
    const numPoints = coords.length;
    const first = coords[0];
    const last  = coords[coords.length - 1];
    const closed = first[0] === last[0] && first[1] === last[1];

    // Sanity check: coordinates should be near Lincoln, NE
    // Lincoln is roughly at lat 40.8, lng -96.7
    const lngs = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;

    const nearLincoln = avgLat > 40.6 && avgLat < 41.0 && avgLng > -97.0 && avgLng < -96.4;

    if (!closed || !nearLincoln || numPoints < 4) {
      hasErrors = true;
      console.log(`  ISSUE: ${f.properties.id} (${f.properties.name}): ` +
        `${numPoints} points, closed=${closed}, nearLincoln=${nearLincoln}, ` +
        `avgLat=${avgLat.toFixed(4)}, avgLng=${avgLng.toFixed(4)}`);
    }
  }

  if (!hasErrors) {
    console.log('  All features passed basic validation (closed polygons, near Lincoln NE)');
  }

  // Show a few sample features
  console.log('\n--- Sample Features ---');
  const sampleIds = ['11136', '11103', '11130', '11132', '15100'];
  for (const sid of sampleIds) {
    const f = features.find(feat => feat.properties.id === sid);
    if (f) {
      const coords = f.geometry.coordinates[0];
      console.log(`  ${f.properties.name} (${f.properties.slug}): ${coords.length} points, ` +
        `segment=${f.properties.segment}, medianPrice=${f.properties.medianPrice}`);
      console.log(`    First coord: [${coords[0]}]`);
      console.log(`    Last  coord: [${coords[coords.length - 1]}]`);
    }
  }
}

main();

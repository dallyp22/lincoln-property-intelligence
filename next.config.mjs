/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['mapbox-gl', '@react-pdf/renderer'],
  async redirects() {
    return [
      {
        source: '/polivka-property-assessment',
        destination: '/sell-your-home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

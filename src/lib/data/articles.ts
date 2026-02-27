import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { Article, ArticleFrontmatter } from '@/types';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'ask-a-realtor');

/**
 * Read all MDX article files from content/ask-a-realtor/, parse frontmatter
 * with gray-matter, and return an array sorted by publishedAt (newest first).
 */
export async function getAllArticles(): Promise<Article[]> {
  const files = await readdir(ARTICLES_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  if (mdxFiles.length === 0) {
    return [];
  }

  const articles = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(ARTICLES_DIR, file);
      const raw = await readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);

      return {
        frontmatter: data as ArticleFrontmatter,
        content,
      } satisfies Article;
    }),
  );

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  );
}

/**
 * Read a single MDX article by slug.
 * Returns `null` if no matching file is found.
 */
export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  try {
    const raw = await readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      frontmatter: data as ArticleFrontmatter,
      content,
    } satisfies Article;
  } catch {
    return null;
  }
}

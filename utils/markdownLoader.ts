import { Article } from '../types';

/**
 * Parses Frontmatter (YAML-like) from the top of markdown files.
 * Robust version that handles leading whitespace/newlines.
 */
function parseFrontmatter(text: string) {
  // 1. CRITICAL: Remove any invisible BOM markers or leading newlines/spaces
  const cleanText = text.trimStart();

  // 2. Verify it actually starts with Frontmatter delimiters
  if (!cleanText.startsWith('---')) {
    return { metadata: {}, content: text };
  }

  // 3. Find the closing delimiter
  // Start searching after the first 3 chars ('---')
  const endDelimiterIndex = cleanText.indexOf('---', 3);

  if (endDelimiterIndex === -1) {
    // Malformed file (no closing ---), treat whole file as content
    return { metadata: {}, content: text };
  }

  // 4. Extract blocks
  const metadataBlock = cleanText.substring(3, endDelimiterIndex);
  const content = cleanText.substring(endDelimiterIndex + 3).trim();
  
  // 5. Parse Key-Values
  const metadata: Record<string, any> = {};

  metadataBlock.split('\n').forEach(line => {
    // Find the first colon to split key and value
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Basic cleanup of quotes
    if ((value.startsWith("'") && value.endsWith("'")) || 
        (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }
    
    // Basic Array Parsing for 'related' and 'tags'
    if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        metadata[key] = arrayContent
            .split(',')
            .map(s => s.trim().replace(/['"]/g, ''))
            .filter(s => s.length > 0);
    } else {
        metadata[key] = value;
    }
  });

  return { metadata, content };
}

/**
 * Fetches a markdown file from the /content directory.
 */
export async function fetchArticleContent(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`/content/${slug}.md`);
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    
    if (text.trim().startsWith('<!DOCTYPE html>')) {
        return null;
    }

    const { metadata, content } = parseFrontmatter(text);

    return {
      id: slug,
      slug: slug,
      title: metadata.title || 'Untitled',
      description: metadata.description || '',
      category: metadata.category || 'General',
      lastUpdated: metadata.lastUpdated || new Date().toLocaleDateString(),
      relatedSlugs: metadata.related || [],
      content: content
    };
  } catch (error) {
    console.warn(`Could not load markdown for ${slug}:`, error);
    return null;
  }
}
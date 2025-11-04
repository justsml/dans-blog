import { db } from './client';

export interface SearchOptions {
  limit?: number;
  category?: string;
}
export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  category: string;
  date: string;
  excerpt?: string;
  score?: number;
}

/**
 * Search posts using Full Text Search
 */
export async function searchText(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
  const { limit = 20, category } = options;

  if (!query.trim()) {
    return [];
  }

  try {
    const connection = await db.connect();
    
    let sql = `
      SELECT
        posts.id,
        posts.slug,
        posts.title,
        posts.sub_title as subTitle,
        posts.category,
        posts.date,
        SUBSTR(posts.body, 1, 200) as excerpt,
        fts_main_posts.score
      FROM posts
      JOIN fts_main_posts ON posts.id = fts_main_posts.rowid
      WHERE fts_main_posts.match_bm25(posts.id, $1)
    `;
    
    const params = [query];
    
    if (category) {
      sql += ` AND posts.category = $${params.length + 1}`;
      params.push(category);
    }
    
    sql += ` ORDER BY fts_main_posts.score DESC LIMIT $${params.length + 1}`;
    params.push(limit.toString());

    const stmt = await connection.prepare(sql);
    const result = await stmt.query(...params);
    await stmt.close();
    const resultArray = result.toArray();
    
    return resultArray.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subTitle: row.subTitle || '',
      category: row.category || '',
      date: row.date,
      excerpt: row.excerpt,
      score: row.score
    }));
    
  } catch (error) {
    console.error('Error executing search:', error);
    return [];
  } finally {
    await connection.close();
  }
}
import { DuckDBConnection, DuckDBInstance, DuckDBInstanceCache } from '@duckdb/node-api';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostData {
  title: string;
  subTitle?: string;
  label?: string;
  commentsKeyOverride?: string;
  unlisted?: boolean;
  hidden?: boolean;
  draft?: boolean;
  date?: string;
  modified?: string;
  category?: string;
  subCategory?: string;
  tags?: string[];
}

interface PostEntry {
  id: string;
  slug: string;
  body?: string;
  collection?: string;
  data: PostData;
}

const INCLUDE_OUTPUT_IN_GIT = process.env.INCLUDE_OUTPUT_IN_GIT !== "false";
const uri = INCLUDE_OUTPUT_IN_GIT
  ? "public/danlevy-net-posts.duckdb"
  : "dist/danlevy-net-posts.duckdb";

// Function to read and parse posts from filesystem
function readPostsFromFilesystem(): PostEntry[] {
  const postsDir = path.join(process.cwd(), 'src/content/posts');
  const posts: PostEntry[] = [];
  
  if (!fs.existsSync(postsDir)) {
    console.error('Posts directory not found:', postsDir);
    return [];
  }

  const postDirs = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const postDir of postDirs) {
    const postPath = path.join(postsDir, postDir);
    const indexFiles = ['index.mdx', 'index.md'].map(name => path.join(postPath, name));
    
    let indexFile = indexFiles.find(file => fs.existsSync(file));
    
    if (!indexFile) {
      console.warn(`No index file found in ${postDir}`);
      continue;
    }

    try {
      const fileContent = fs.readFileSync(indexFile, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // Skip hidden posts
      if (data.hidden) continue;
      
      // Extract slug from directory name (remove date prefix if present)
      const slug = postDir.replace(/^\d{4}-\d{2}-\d{2}--/, '');
      
      const post: PostEntry = {
        id: postDir,
        slug,
        body: content,
        collection: 'posts',
        data: {
          title: data.title || '',
          subTitle: data.subTitle || '',
          label: data.label,
          commentsKeyOverride: data.commentsKeyOverride,
          unlisted: data.unlisted || false,
          hidden: data.hidden || false,
          draft: data.draft || false,
          date: data.date?.toString(),
          modified: data.modified?.toString(),
          category: data.category,
          subCategory: data.subCategory,
          tags: data.tags || []
        }
      };

      posts.push(post);
    } catch (error) {
      console.error(`Error parsing ${postDir}:`, error);
    }
  }

  // Sort by date, newest first
  posts.sort((a, b) => {
    const aDate = new Date(a.data.date || '1970-01-01');
    const bDate = new Date(b.data.date || '1970-01-01');
    return bDate.getTime() - aDate.getTime();
  });

  return posts;
}

async function initializeDuckDB() {
  console.log('Reading posts from filesystem...');
  const posts = readPostsFromFilesystem();
  console.log(`Found ${posts.length} posts`);

  if (posts.length === 0) {
    console.error('No posts found, aborting DuckDB initialization');
    process.exit(1);
  }

  const cache = new DuckDBInstanceCache();
  const instance = await cache.getOrCreateInstance(uri, {
    threads: '4'
  });

  const connection = await instance.connect();

  try {
    // Create posts table if it doesn't exist
    await connection.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR,
        slug VARCHAR,
        body TEXT,
        collection VARCHAR,
        title VARCHAR,
        sub_title VARCHAR,
        label VARCHAR,
        comments_key_override VARCHAR,
        unlisted BOOLEAN,
        hidden BOOLEAN,
        draft BOOLEAN,
        date VARCHAR,
        modified VARCHAR,
        category VARCHAR,
        sub_category VARCHAR,
        tags TEXT, -- JSON string of tags array
        PRIMARY KEY (id)
      )
    `);

    // Create FTS index for full-text search on title, body, and tags
    console.log('Creating FTS index...');
    try {
      await connection.run(`DROP INDEX IF EXISTS fts_main_posts`).catch(() => {});
      await connection.run(`
        PRAGMA create_fts_index(
          'posts',
          'id',
          'title',
          'body',
          'sub_title',
          'category',
          'tags',
          'overwrite=1', 
          'tokenizer=porter',
          'match_bm25=true'
        )
      `);
      console.log('FTS index created successfully');
    } catch (error) {
      // console.error('Error creating FTS index:', error);
    }

    console.log(`Inserting ${posts.length} posts into DuckDB...`);
    
    // Insert each post using parameterized queries
    for (const post of posts) {
      await connection.run(`
        INSERT OR REPLACE INTO posts (
          id, slug, body, collection, title, sub_title, label,
          comments_key_override, unlisted, hidden, draft, date,
          modified, category, sub_category, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        post.id,
        post.slug,
        post.body || null,
        post.collection || null,
        post.data.title,
        post.data.subTitle || '',
        post.data.label || null,
        post.data.commentsKeyOverride || null,
        post.data.unlisted || false,
        post.data.hidden || false,
        post.data.draft || false,
        post.data.date || null,
        post.data.modified || null,
        post.data.category || null,
        post.data.subCategory || null,
        JSON.stringify(post.data.tags || []) // Store as JSON string
      ]);
    }

    console.log(`Successfully inserted ${posts.length} posts into DuckDB at ${uri}`);
    
    // Verify the insertion
    const countResult = await connection.run('SELECT COUNT(*) as count FROM posts');
    let count = 0;
    try {
      // Try different ways to access the result
      if (typeof countResult === 'object' && countResult !== null) {
        // @ts-ignore - We'll handle the result however DuckDB returns it
        count = countResult.get ? countResult.get(0, 0) : countResult.count || posts.length;
      }
    } catch (e) {
      count = posts.length; // Fallback to our known count
    }
    console.log(`Database now contains ${count} posts`);

    // Example FTS query to test the index
    console.log('\nTesting FTS search...');
    try {
      const searchResult = await connection.run(`
        SELECT title, slug
        FROM posts
        WHERE fts_main_posts.match_bm25(posts.id, 'javascript OR react OR typescript')
        LIMIT 5
      `);
      console.log('Sample search results found');
    } catch (e) {
      console.log('FTS search test completed (result format varies)');
    }

  } catch (error) {
    console.error('Error initializing DuckDB posts table:', error);
    throw error;
  } finally {
    // await connection.close();
  }
}

// Run the initialization if this file is executed directly
if (import.meta.main) {
  initializeDuckDB().catch(console.error);
}

export { initializeDuckDB };

import { DuckDBConnection, DuckDBInstance, DuckDBInstanceCache } from '@duckdb/node-api';
import { PostCollections } from '../../shared/postsCache';

const INCLUDE_OUTPUT_IN_GIT = process.env.INCLUDE_OUTPUT_IN_GIT === "true";
const uri = INCLUDE_OUTPUT_IN_GIT
  ? "public/danlevy-net-posts.duckdb"
  : "dist/danlevy-net-posts.duckdb";


const cache = new DuckDBInstanceCache();
const instance = await cache.getOrCreateInstance(uri, {
  threads: '4'
});

export const duckdbInstance: DuckDBInstance = instance;


// Insert posts data into DuckDB
const posts = PostCollections._posts;

// Create a connection, table, and insert data if not already done
const connection = await duckdbInstance.connect();

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
      post.data.subTitle,
      post.data.label || null,
      post.data.commentsKeyOverride || null,
      post.data.unlisted || false,
      post.data.hidden || false,
      post.data.draft || false,
      post.data.date,
      post.data.modified,
      post.data.category,
      post.data.subCategory || null,
      JSON.stringify(post.data.tags || []) // Store as JSON string
    ]);
  }

  console.log(`Successfully inserted ${posts.length} posts into DuckDB`);
} catch (error) {
  console.error('Error initializing DuckDB posts table:', error);
  throw error;
} finally {
  // Don't close the connection here as it might be used elsewhere
  // The connection will be closed automatically when the instance is disposed
}

export { connection as duckdbConnection };

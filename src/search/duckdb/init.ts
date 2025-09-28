import { DuckDBConnection, DuckDBInstance, DuckDBInstanceCache } from '@duckdb/node-api';
import { PostCollections } from '../../shared/dataCache';

const INCLUDE_OUTPUT_IN_GIT = process.env.INCLUDE_OUTPUT_IN_GIT !== "false";
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

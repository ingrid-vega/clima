import pkg from 'pg';

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || null;

// Create a pool only if a connection string is provided.
const pool = connectionString ? new Pool({ connectionString }) : null;

async function query(text, params) {
  if (!pool) throw new Error('DATABASE_URL not configured');
  return (await pool.query(text, params));
}

async function ensureTable() {
  if (!pool) throw new Error('DATABASE_URL not configured');
  const sql = `
    CREATE TABLE IF NOT EXISTS search_history (
      id SERIAL PRIMARY KEY,
      city TEXT,
      source TEXT,
      result JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(sql);
}

export { query, ensureTable };

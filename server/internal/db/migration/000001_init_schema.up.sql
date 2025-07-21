CREATE TABLE sessions (
  id TEXT NOT NULL PRIMARY KEY,
  secret_hash BLOB NOT NULL,
  created_at INTEGER NOT NULL
);
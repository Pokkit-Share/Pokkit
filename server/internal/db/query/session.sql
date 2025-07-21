-- name: CreateSession :exec
INSERT INTO sessions (id, secret_hash, created_at)
VALUES ($1, $2, $3);
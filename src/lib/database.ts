import 'server-only';

import { neon } from '@neondatabase/serverless';

export async function connectDB() {
	const dbUrl = process.env.DB_URL ?? '';
	const sql = neon(dbUrl);

	return sql;
}

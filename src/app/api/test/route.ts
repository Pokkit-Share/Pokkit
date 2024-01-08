import 'server-only';

import { connectDB } from '@/lib/db/database';

export async function GET(request: Request) {
	try {
		const sql = await connectDB();
		console.log('db connected!');

		const response = await sql`SELECT version()`;
		return Response.json(response);
	} catch (err) {
		console.log(err);
		return Response.json({ msg: 'err' });
	}
}

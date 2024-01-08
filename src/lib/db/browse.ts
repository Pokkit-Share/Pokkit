import 'server-only';

import { connectDB } from '@/lib/db/database';
import { z } from 'zod';

export async function getBrowse() {
	const sql = await connectDB();
	const query = await sql`
			SELECT
				thread.id, thread.title, thread.rental_code, thread.description, thread.updated_at, auth.user.username
				, (SELECT COUNT(*) AS comments FROM post.comment c WHERE thread.id = c.thread_id)
				, (SELECT COUNT(*) AS upvotes FROM post.thread_upvote t WHERE thread.id = t.thread_id)
				, (SELECT ARRAY_AGG(p.species) AS team FROM post.pokemon p WHERE thread.id = p.thread_id)
			FROM
				post.thread
			LEFT JOIN
				auth.user ON thread.user_id = auth.user.id
			GROUP BY
				auth.user.username, thread.id;
		`;

	const schema = z.array(
		z.object({
			id: z.string().uuid(),
			title: z.string(),
			rental_code: z.nullable(z.string()),
			description: z.nullable(z.string()),
			updated_at: z.coerce.date(),
			username: z.string(),
			comments: z.coerce.number(),
			upvotes: z.coerce.number(),
			team: z.array(z.string()),
		})
	);

	return schema.parse(query);
}

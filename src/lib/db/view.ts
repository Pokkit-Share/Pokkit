import 'server-only';

import { connectDB } from '@/lib/db/database';
import { z } from 'zod';

interface comment {
	id: string;
	body: string | null;
	updated_at: Date;
	parent_comment_id: string | null;
}

interface nestedComment extends comment {
	children: nestedComment[];
}

function createNestedComments(comments: comment[]): nestedComment[] {
	const commentMap = new Map<string, nestedComment>();

	comments.forEach((comment) => {
		const nestedComment: nestedComment = {
			...comment,
			children: commentMap.get(comment.id)?.children || [],
		};
		commentMap.set(comment.id, nestedComment);

		if (comment.parent_comment_id) {
			const parentComment = commentMap.get(comment.parent_comment_id);
			if (parentComment) {
				parentComment.children = parentComment.children || [];
				parentComment.children.push(nestedComment);
			}
		}
	});

	const nestedComments = Array.from(commentMap.values());
	const topLevelComments = nestedComments.filter(
		(comment) => !comment.parent_comment_id
	);

	return topLevelComments;
}

export async function getView(thread_id: string) {
	const sql = await connectDB();
	const [query] = await sql`
			WITH RECURSIVE CommentTree AS (
				SELECT
						id,
						body,
						updated_at,
						parent_comment_id,
						thread_id,
						1 AS depth
				FROM post.comment
				WHERE parent_comment_id IS NULL
		
				UNION ALL
		
				SELECT
						c.id,
						c.body,
						c.updated_at,
						c.parent_comment_id,
						c.thread_id,
						ct.depth + 1
				FROM
						post.comment c
				JOIN
						CommentTree ct ON c.parent_comment_id = ct.id
				WHERE
						ct.depth < 4
			)
			SELECT
					thread.id,
					thread.title,
					thread.series,
					thread.format,
					thread.rental_code,
					thread.description,
					thread.body,
					thread.updated_at,
					jsonb_agg(jsonb_build_object(
							'id', ct.id,
							'body', ct.body,
							'updated_at', ct.updated_at,
							'parent_comment_id', ct.parent_comment_id
					)) AS comments,
					p.team
			FROM
					post.thread
			LEFT JOIN
					CommentTree ct ON ct.thread_id = thread.id
			LEFT JOIN (
					SELECT
							thread_id,
							jsonb_agg(pokemon) AS team
					FROM
							post.pokemon
					GROUP BY
							thread_id
			) p ON p.thread_id = thread.id
			WHERE
					thread.id = ${thread_id}
			GROUP BY
					thread.id, p.team;
		`;

	const schema = z.object({
		id: z.string().uuid(),
		title: z.string(),
		series: z.string(),
		format: z.string(),
		rental_code: z.nullable(z.string()),
		description: z.nullable(z.string()),
		body: z.nullable(z.string()),
		updated_at: z.coerce.date(),
		team: z.array(
			z.object({
				id: z.string().uuid(),
				item: z.nullable(z.string()),
				moves: z.array(z.string()),
				nature: z.string(),
				ability: z.string(),
				hp_ivs: z.coerce.number(),
				atk_ivs: z.coerce.number(),
				def_ivs: z.coerce.number(),
				spa_ivs: z.coerce.number(),
				spd_ivs: z.coerce.number(),
				speed_ivs: z.coerce.number(),
				hp_evs: z.coerce.number(),
				atk_evs: z.coerce.number(),
				def_evs: z.coerce.number(),
				spa_evs: z.coerce.number(),
				spd_evs: z.coerce.number(),
				speed_evs: z.coerce.number(),
				species: z.string(),
				thread_id: z.string().uuid(),
				extra_data: z.any(),
			})
		),
		comments: z.array(
			z.object({
				id: z.string().uuid(),
				body: z.nullable(z.string()),
				updated_at: z.coerce.date(),
				parent_comment_id: z.nullable(z.string()),
			})
		),
	});

	const validatedQuery = schema.parse(query);

	return {
		...validatedQuery,
		comments: createNestedComments(validatedQuery.comments),
	};
}

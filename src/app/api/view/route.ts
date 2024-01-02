import 'server-only';

import { connectDB } from '@/lib/database';

export async function GET(request: Request) {
	try {
		const data = {
			id: 'e388013e-2be3-4d3d-b3e8-f6e900873d3b',
			title: 'Ceruledge and Landorus',
			series: 'Pokemon Scarlet & Violet',
			format: 'Regulation D',
			rental_code: '01BB5X',
			description: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
			body: '',
			pokemons: [
				
			],
			upvotes: 143,
			createdAt: Date.now(),
			updatedAT: Date.now(),
			user: 'User1',
			comments: [
				{
					id: '1b2bb7b6-4a92-4ec9-8297-4af89ca783ac',
					body: 'Norem ipsum',
					upvotes: 143,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					user: 'User2',
					parent_id: null,
				},
				{
					id: '419172a2-4d9a-4146-8e91-147d3a2cdd85',
					body: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
					upvotes: 143,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					user: 'User3',
					parent_id: '1b2bb7b6-4a92-4ec9-8297-4af89ca783ac',
				},
				{
					id: '01e9268c-cb71-4936-9afd-01e21c12846d',
					body: 'Norem ipsum',
					upvotes: 143,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					user: 'User4',
					parent_id: '1b2bb7b6-4a92-4ec9-8297-4af89ca783ac',
				},
				{
					id: '6b6bd1a6-ffe3-40cb-918f-ecb4169b13e9',
					body: 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
					upvotes: 143,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					user: 'User5',
					parent_id: '01e9268c-cb71-4936-9afd-01e21c12846d',
				},
				{
					id: '08be411e-96d8-4982-92fa-0a906c3be4cd',
					body: 'Norem ipsum',
					upvotes: 143,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					user: 'User6',
					parent_id: null,
				},
			],
		};
		return Response.json(data);
	} catch (err) {
		console.log(err);
		return Response.json({ msg: 'err' });
	}
}

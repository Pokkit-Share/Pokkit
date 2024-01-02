import 'server-only';

import { connectDB } from '@/lib/database';

export async function GET(request: Request) {
	try {
		const data = [
			{
				id: 'bab012a9-5f99-4469-a3f1-99746546ce0f',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description:
					'Combo utilizing Bellibolt and Oranguru\nPorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User1',
			},
			{
				id: '7319fac6-126f-45e6-99de-3b13417e83ff',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description: null,
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User2',
			},
			{
				id: 'b0664a00-f08b-4811-be16-beb3dbeff717',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description:
					'Combo utilizing Bellibolt and Oranguru\nPorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ',
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User3',
			},
			{
				id: '768220bc-b45e-471f-83ed-6e4acb698b80',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description:
					'Combo utilizing Bellibolt and Oranguru\nPorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User4',
			},
			{
				id: 'c7bafbc7-5215-4191-b388-84cc51023288',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description: null,
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User5',
			},
			{
				id: '86525b34-c193-4539-aed9-c9795b1c32f8',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description:
					'Combo utilizing Bellibolt and Oranguru\nPorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User6',
			},
			{
				id: '9bac399a-fa3a-4408-a850-6cdde1d66b30',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description: null,
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User7',
			},
			{
				id: '9a537721-ab65-4130-b522-ffb1d61eaf47',
				title: 'VGC Some Tournament 2023 Reg B',
				rental_code: '01BB5X',
				description:
					'Combo utilizing Bellibolt and Oranguru\nPorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
				pokemons: [
					'Bellibolt',
					'Oranguru',
					'Ceruledge',
					'Landorus-T',
					'Murkrow',
					'Flutter Mane',
				],
				upvotes: 143,
				comments: 143,
				createdAt: Date.now(),
				updatedAT: Date.now(),
				user: 'User8',
			},
		];
		return Response.json(data);
	} catch (err) {
		console.log(err);
		return Response.json({ msg: 'err' });
	}
}

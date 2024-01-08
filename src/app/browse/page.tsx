import type { Metadata } from 'next';
import { getBrowse } from '@/lib/db';

export const metadata: Metadata = {
	title: 'Browse | Pokkit Share',
	description: 'Browse Pokemon VGC teams on Pokkit',
};

export default async function Page() {
	try {
		const data = await getBrowse();
		console.log(data);
	} catch (err) {
		console.log(err);
	}

	return <main className='max-w-6xl mx-auto mt-12 px-4'>Browse Page</main>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create | Pokkit Share',
	description: 'Create and share a Pokemon VGC team',
};

export default async function Page() {
	return <main className='max-w-6xl mx-auto mt-12 px-4'>Create Page</main>;
}

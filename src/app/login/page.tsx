import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pokkit Share',
	description: 'Description',
};

export default async function Page() {
	return <main className='max-w-6xl mx-auto mt-12 px-4'>Login Page</main>;
}

import { getView } from '@/lib/db';

export default async function Page({ params }: { params: { slug: string } }) {
	try {
		const data = await getView(params.slug);
		// http://localhost:3000/view/f0c71094-dbce-4e50-b143-36e791a04337 to test
	} catch (err) {
		console.log(err);
	}

	return <main className=''></main>;
}

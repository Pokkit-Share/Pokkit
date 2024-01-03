export default async function Home() {
	const baseURL = process.env.BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseURL}/api/view`);
	const data = await res.json();
	console.log(data);

	return <main className=''></main>;
}

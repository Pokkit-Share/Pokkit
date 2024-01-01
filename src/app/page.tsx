export default async function Home() {
	const res = await fetch('http://localhost:3000/api/test')
	const data = await res.json()
	console.log(data)

	return <main className=''></main>;
}

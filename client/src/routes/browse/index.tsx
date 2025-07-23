import { Await, createFileRoute } from '@tanstack/react-router';

import { BrowseData, getBrowse } from '@queries/browse';
import './browse.css';

export const Route = createFileRoute('/browse/')({
	component: RouteComponent,
	loader: async () => {
		const data = getBrowse();
		return {
			deferredSlowData: data,
		};
	},
});

function RouteComponent() {
	const { deferredSlowData } = Route.useLoaderData();
	return (
		<Await promise={deferredSlowData} fallback={<LoadingComponent />}>
			{(data) => {
				return (
					<main className='main-container'>
						{data.map((item) => {
							return (
								<ThreadCard
									key={item.id}
									{...item}
									// id={item.id}
									// team={item.team}
									// title={item.title}
									// description={item.description}
									// updated_at={item.updated_at}
									// upvoteCount={item.upvoteCount}
									// commentCount={item.commentCount}
									// username={item.username}
								/>
							);
						})}
					</main>
				);
			}}
		</Await>
	);
}

function LoadingComponent() {
	return <main className='main-container'>Loading...</main>;
}

function ThreadCard(props: typeof BrowseData.infer) {
	const { id, team, title, description, updated_at, upvoteCount, commentCount, username } = props;
	const tempTeam = [1, 2, 3, 4, 5, 6];
	return (
		<section className='thread-container'>
			<div className='thread-pokemon-grid'>
				{tempTeam.map((pokemon) => {
					return (
						<div className='thread-pokemon-container'>
							<div className='thread-pokemon-circle'></div>
							<img
								className='thread-pokemon-image'
								width={56}
								height={56}
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`}
								alt=''
							/>
						</div>
					);
				})}
			</div>

			<h3 className='thread-title'>
				<a href={`/view/${id}`}>{title}</a>
			</h3>

			<p className='thread-date'>Last Updated: 01/02/2023</p>

			{description ? (
				<p className='thread-description'>{description}</p>
			) : (
				<p className='thread-no-description'>No description</p>
			)}

			<div className='thread-footer'></div>
		</section>
	);
}

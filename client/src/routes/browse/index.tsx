import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import './browse.css';

export const Route = createFileRoute('/browse/')({
	component: RouteComponent,
});

const testData: BrowseData = [
	{
		id: '1',
		title: 'test',
		rental_code: 'test',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida metus eu tincidunt aliquet. Fusce vestibulum ligula in lorem posuere pellentesque. Ut venenatis erat quis metus auctor, id tempor neque pulvinar. Integer sem sem, luctus quis turpis et, aliquet euismod nunc. Nam fermentum in purus sed gravida. Nam sit amet dignissim ipsum. Morbi eu velit ultrices, elementum mauris vel, tincidunt sem. Donec dictum augue vel dolor rhoncus interdum. Maecenas viverra venenatis pulvinar. Nullam massa quam, commodo nec leo vel, congue cursus lacus.',
		updated_at: 0,
		username: 'username',
		commentCount: 2,
		upvoteCount: 3,
		team: [],
	},
	{
		id: '2',
		title: 'test2',
		rental_code: 'test2',
		description: '',
		updated_at: 1,
		username: 'username2',
		commentCount: 4,
		upvoteCount: 6,
		team: [],
	},
];

type BrowseData = {
	id: string;
	title: string;
	rental_code: string;
	description: string;
	updated_at: number;
	username: string;
	commentCount: number;
	upvoteCount: number;
	team: string[];
}[];

function RouteComponent() {
	const [data, setData] = useState(testData);
	return (
		<main className='main-container'>
			{data.map((item) => (
				<ThreadCard
					key={item.id}
					id={item.id}
					team={item.team}
					title={item.title}
					description={item.description}
					updated_at={item.updated_at}
					upvoteCount={item.upvoteCount}
					commentCount={item.commentCount}
					username={item.username}
				/>
			))}
		</main>
	);
}

function ThreadCard(props) {
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

			{description ? <p className='thread-description'>{description}</p> : <p className='thread-no-description'>No description</p>}

			<div className="thread-footer">

			</div>

		</section>
	);
}

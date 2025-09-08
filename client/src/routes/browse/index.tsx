import { Await, createFileRoute} from '@tanstack/react-router';
import { type } from 'arktype';
import { Label, Select } from 'radix-ui';

import { BrowseData, getBrowse } from '@queries/browse';
import { formatDate } from '@/utils/date';

import './browse.css';
import Loading from '@components/loading';
import { Dialog } from '@components/dialog'
import Button from '@/components/button';

const browseSearchSchema = type({
	pokemon: "string[]?",
	generation: "string?",
	regulation: "string?",
})

export const Route = createFileRoute('/browse/')({
	validateSearch: browseSearchSchema,
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
	const { pokemon, generation, regulation } = Route.useSearch();

	return (
		<main className='main-container'>
		<Dialog.Root side="bottom">
			<Dialog.Trigger asChild>
				<button>Filter</button>
			</Dialog.Trigger>
			<Dialog.Content className="">
				<Dialog.Title>
					Filter
				</Dialog.Title>
			</Dialog.Content>
		</Dialog.Root>

		<Await promise={deferredSlowData} fallback={<LoadingComponent />}>
		{(data) => {
			return (
				<>
				{data.map((item) => {
					return (
						<ThreadCard
						key={item.id}
						{...item}
						/>
					);
				})}
				</>
			);
		}}
		</Await>
		</main>
	);
}

function LoadingComponent() {
	return <Loading />;
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

		<p className='thread-date'>Last Updated: {formatDate(updated_at)}</p>

		{description ? (
			<p className='thread-description'>{description}</p>
		) : (
		<p className='thread-no-description'>No description</p>
		)}

		<div className='thread-footer'>
		{upvoteCount}
		</div>
		</section>
	);
}

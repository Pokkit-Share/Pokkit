import { Await, createFileRoute} from '@tanstack/react-router';
import { type } from 'arktype';
import { Label, Popover, Select } from 'radix-ui';

import { BrowseData, getBrowse } from '@queries/browse';
import { formatDate } from '@/utils/date';

import './browse.css';
import Loading from '@components/loading';
import { Dialog } from '@components/dialog'
import Button from '@/components/button';
import { useState } from 'react';
import { Command } from 'cmdk';
import { pokemonSpecies } from '@/utils/pokemon';

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
	const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);

	function toggleSelection(item: string) {
		if (selectedPokemon.includes(item)){
			setSelectedPokemon(selectedPokemon.filter((p) => p !== item))
		} else {
			setSelectedPokemon([...selectedPokemon, item])
		}
	}

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
				<SelectComponent
					items={["date", "title", "upvotes", "views"]}
					label="Sort By"
					name="sort"
					defaultValue='date'
				/>
				<SelectComponent
					items={["pokemon scarlet & violet"]}
					label="Series"
					name="series"
				/>
				<SelectComponent
					items={["regulation b"]}
					label="Format"
					name="format"
				/>
				<Label.Root className="label" htmlFor='pokemon'>
					Includes Pokemon:
				</Label.Root>
				<ul>
					{selectedPokemon.map((item) => (
						<li>
							{item}
						</li>
					))}
				</ul>
				<ComboBoxComponent items={pokemonSpecies} onSelect={toggleSelection} />
				<SelectComponent
					items={["any"]}
					label="Has Rental"
					name="hasRental"
					defaultValue='any'
				/>
				<SelectComponent
					items={["any"]}
					label="Has Guide"
					name="hasGuide"
					defaultValue='any'
				/>
				<Button wide={true} style={{marginTop: "0.75rem"}}>Search</Button>
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

function ComboBoxComponent(props: { items:string[], onSelect:(item:string) => void }) {
	const { items, onSelect } = props 
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<Button className='combobox-trigger' wide={true}>
					Select Pokemon
				</Button>
			</Popover.Trigger>

			<Popover.Content className='combobox-content' align='start' sideOffset={5}>
				<Command>
					<Command.Input
						placeholder='Type to search...'
						className='combobox-input'
					/>
					<Command.List className='combobox-list'>
						<Command.Empty className='combobox-empty'>
							No results found.
						</Command.Empty>
						<Command.Group>
							{items.map((item) => {
								return (
									<Command.Item
										key={item}
										value={item}
										onSelect={() => {onSelect(item)}}
									>
										{item}
									</Command.Item>
								)
							})}
						</Command.Group>
					</Command.List>
				</Command>
			</Popover.Content>
		</Popover.Root>
	)
}

type SelectComponentProps = {
	items: string[];
	label: string;
	name: string;
	defaultValue?: string
}

function SelectComponent(props: SelectComponentProps) {
	const { items, label, name, defaultValue } = props
	return (
		<>
			<Label.Root className="label" htmlFor={name}>
				{label}:
			</Label.Root>
			<Select.Root name={name} defaultValue={defaultValue || ''}>
				<Select.Trigger id={name} className='select-trigger' aria-label={label}>
					<Select.Value placeholder="Select..." />
				</Select.Trigger>
				<Select.Portal>
					<Select.Content className='select-content' position='popper' sideOffset={5}>
						<Select.Viewport className='select-viewport'>
							{items.map((item) => {
								return (
									<Select.Item className='select-item' key={item} value={item}>
										<Select.ItemText>{item}</Select.ItemText>
									</Select.Item>
								)
							})}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</>
	)
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

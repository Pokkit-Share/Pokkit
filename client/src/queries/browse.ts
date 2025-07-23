import { type } from 'arktype';

export const BrowseData = type({
	id: type.string,
	title: type.string,
	rental_code: type.string,
	description: type.string,
	updated_at: type.number,
	username: type.string,
	commentCount: type.number,
	upvoteCount: type.number,
	team: type.string.array(),
});

// type BrowseData = {
// 	id: string;
// 	title: string;
// 	rental_code: string;
// 	description: string;
// 	updated_at: number;
// 	username: string;
// 	commentCount: number;
// 	upvoteCount: number;
// 	team: string[];
// }[];

type BrowseData = (typeof BrowseData.infer)[];

const testData: BrowseData = [
	{
		id: '1',
		title: 'test',
		rental_code: 'test',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida metus eu tincidunt aliquet. Fusce vestibulum ligula in lorem posuere pellentesque. Ut venenatis erat quis metus auctor, id tempor neque pulvinar. Integer sem sem, luctus quis turpis et, aliquet euismod nunc. Nam fermentum in purus sed gravida. Nam sit amet dignissim ipsum. Morbi eu velit ultrices, elementum mauris vel, tincidunt sem. Donec dictum augue vel dolor rhoncus interdum. Maecenas viverra venenatis pulvinar. Nullam massa quam, commodo nec leo vel, congue cursus lacus.',
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
	{
		id: '3',
		title: 'test3',
		rental_code: 'test2',
		description: '',
		updated_at: 1,
		username: 'username2',
		commentCount: 4,
		upvoteCount: 6,
		team: [],
	},
	{
		id: '4',
		title: 'test4',
		rental_code: 'test2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida metus eu tincidunt aliquet. Fusce vestibulum ligula in lorem posuere pellentesque. Ut venenatis erat quis metus auctor, id tempor neque pulvinar. Integer sem sem, luctus quis turpis et, aliquet euismod nunc. Nam fermentum in purus sed gravida. Nam sit amet dignissim ipsum. Morbi eu velit ultrices, elementum mauris vel, tincidunt sem. Donec dictum augue vel dolor rhoncus interdum. Maecenas viverra venenatis pulvinar. Nullam massa quam, commodo nec leo vel, congue cursus lacus.',
		updated_at: 1,
		username: 'username2',
		commentCount: 4,
		upvoteCount: 6,
		team: [],
	},
];

export function getBrowse(): Promise<BrowseData> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const out = BrowseData.array()(testData);
			if (out instanceof type.errors) {
				reject(new Error('Invalid data'));
			} else {
				resolve(testData);
			}
		}, 1000);
	});
}


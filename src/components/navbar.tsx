import { Button } from './ui/button';
import { MenuSquare, Menu } from 'lucide-react';

export default function Navbar() {
	return (
		<header className='sticky top-0 bg-background'>
			<nav className='flex gap-8 max-w-[84rem] m-auto px-4 py-2 items-center'>
				<a href='/' className='font-extrabold text-lg text-primary px-2'>Pokkit</a>
				<ul className='hidden sm:flex gap-2 mr-auto'>
					<li>
						<a href='/browse' className='px-1'>Browse</a>
					</li>
					<li>
						<a href='/create' className='px-1'>Create</a>
					</li>
				</ul>
				{/* <a href="/login" className='hidden sm:block'>Login</a> */}
				<Button asChild>
					<a href='/login' className='hidden sm:block'>
						Login
					</a>
				</Button>
				<button className='sm:hidden ml-auto block text-primary'><Menu size={36} className='fill-current' /></button>
			</nav>
		</header>
	);
}

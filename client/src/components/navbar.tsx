import { Link } from '@tanstack/react-router';
import './navbar.css';

export default function Navbar() {
	return (
		<header className='navbar-header'>
			<nav className='navbar-nav'>
				<a className='navbar-brand' href='/'>
					Pokkit
				</a>
				<Link to='/'>Home</Link>
				<Link to='/browse'>Browse</Link>
				<Link to='/create'>Create</Link>
			</nav>
		</header>
	);
}

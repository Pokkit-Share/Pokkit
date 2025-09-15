import { Link } from '@tanstack/react-router';
import './navbar.css';

export default function Navbar() {
	return (
		<header className='navbar-header'>
			<nav className='navbar-nav'>
				<Link to='/' className='navbar-brand'>
					Pokkit
				</Link>
				<Link to='/browse'>Browse</Link>
				<Link to='/create'>Create</Link>
			</nav>
		</header>
	);
}

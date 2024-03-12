'use client'

import styles from './about.module.css';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'

export default function Header() {
	type NavStyle =
		| { right: '0' }
		| { right: '-100%' }
	const [navStyle, setNavStyle] = useState<NavStyle>({ right: '-100%' })

	const toggleNav = () => {
		navStyle.right === '0' ? setNavStyle({ right: '-100%' }) : setNavStyle({ right: '0' })
	}
	return (
		<header className={styles.header}>
			<Link href='/'>
				<h1>Andria</h1>
			</Link>
			<nav style={navStyle} className={styles.nav} >
				<div className={styles.link_container} >
					<Link href='#'>
						<p>About Us</p>
					</Link>
					<Link href='#'>
						<p>Discover</p>
					</Link>
					<Link href='#'>
						<p>Add Books</p>
					</Link>
					<Link href='#'>
						<p>Socialize</p>
					</Link>
				</div>
				<div className={styles.btn_container}>
					<div className={styles.btn}>
						<Link href='/signup'> Sign up </Link>
					</div>
					<div className={styles.btn}>
						<Link href='/login'> Login</Link>
					</div>
				</div>
			</nav>
			<MenuIcon onClick={() => toggleNav()} className={styles.menu_icon} />
		</header>
	)
}

'use client'

import styles from './about.module.css';
export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>© {new Date().getFullYear()} Andria. All rights reserved.</p>
		</footer>
	)
}

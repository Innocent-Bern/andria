'use client'
import styles from './about.module.css';
import Link from 'next/link'
export default function AboutUs() {
	return (
		<article className={styles.about}>
			<section className={styles.content}>
				<h1>DISCOVER NEW TITLES </h1>
				<h2>SHARE OLD ONES</h2>
			</section>
			<section className={styles.abt_btn_container}>

				<div > <Link href='/signup'> Sign Up </Link></div>
				<div> <Link href='/login'> Login</Link></div>
			</section>
			<section className={styles.dash_display}>
			</section>

		</article>
	)
}

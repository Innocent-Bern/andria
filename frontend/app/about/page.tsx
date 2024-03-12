'use client'

import styles from '../_components/about/about.module.css';

import Header from '../_components/about/Header'
import AboutUs from '../_components/about/AboutUS'
export default function About() {
	/**
	 * components
	 * header
	 * About us section
	 * Image banner of the dashboard
	 * 3 features sections
	 * footer
	*/
	return (
		<main className={styles.main}>
			<Header />
			<AboutUs />
			<article></article>
			<article></article>
			<article></article>
			<footer></footer>
		</main>
	)
}

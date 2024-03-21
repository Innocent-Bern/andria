'use client'

import styles from '../_components/about/about.module.css';

import Header from '../_components/about/Header'
import AboutUs from '../_components/about/AboutUS'
import Features from '../_components/about/Features'
import Footer from '../_components/about/Footer'
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
			<Features />
			<Footer />
		</main>
	)
}

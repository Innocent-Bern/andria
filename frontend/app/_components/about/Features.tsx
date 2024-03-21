'use client'
import Add from "../../../public/images/add.png"
import React from 'react'
import styles from './about.module.css';
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react";
export default function Features() {
	const [domLoaded, setDomLoaded] = useState(false);
	useEffect(() => {
		setDomLoaded(true)
	}, [])
	return (
		<article className={styles.features}>
			{domLoaded &&

				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<h1>Features</h1>
				</motion.div>
			}

			{domLoaded &&

				<motion.div
					initial={{ opacity: 0, y: 200 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<section className={styles.feature}>
						<div className={styles.feature_content}>
							<h2>Discover New books</h2>
							<p> Browse from thousands of books to discover books you love </p>
						</div>
						<div
							className={styles.feature_image_container}>
							<div className={styles.feature_image}>
							</div>
						</div>
					</section>
				</motion.div>
			}

			{domLoaded &&

				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<section className={styles.feature && styles.feature_one}>
						<div className={styles.feature_content}>
							<h2>Share Old Books</h2>
							<p> Share books from your collection </p>
						</div>
						<div
							className={styles.feature_image_container}>
							<div className={styles.feature_image}>
							</div>
						</div>
					</section>
				</motion.div>
			}

			{domLoaded &&

				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<section className={styles.feature && styles.feature_two}>
						<div className={styles.feature_content}>
							<h2>Make New Friends</h2>
							<p> Chat with other book enthusiasts and make new friends </p>
						</div>
						<div
							className={styles.feature_image_container}>
							<div className={styles.feature_image}>
							</div>
						</div>
					</section>
				</motion.div>
			}
		</article>
	)
}

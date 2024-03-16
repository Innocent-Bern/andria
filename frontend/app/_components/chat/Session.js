'use client'
import { useEffect, useState } from 'react'
import styles from './chat.module.css'
import { useAppSelector } from '../../../lib/hooks';
/**
 * message sender
 * if it's the current user, display message right
 *
 * components:
 * header with receiver name and option to close chat
 * display according sender
 * message prompt and send btn 
 * 
 * on click go to display chat
 */

function Message({ message }) {
	return (
		<section className={styles.message_container} >
			<div className={styles.message}>
				{message}
			</div>
		</section>
	)
}

export default function Session() {
	/**
	 * append new message to the session object
	 * update the chat 
	 * send new data to db -- append new  message to messages array
	*/
	const chat = useAppSelector(state => state.selectChat.chat)
	const user = useAppSelector(state => state.auth.user)
	useEffect(() => {
		console.log(chat);
	}, [])
	return (
		<article className={styles.session}>
			<section>
				<h1> Chat   </h1>
				<div> Close </div>
			</section>

			<form >
				<textarea
					name="message"
					rows="3"
					cols="30"
					required
					placeholder="Enter message"
				>
				</textarea>
				<button type="submit" className={styles.btn} >Send</button>
			</form>
		</article>
	)
}

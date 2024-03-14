'use client'

import styles from './chat.module.css'
import { useState, useEffect } from 'react'
import { GET_CHAT } from '../../_hooks/chatApi';
/*
 * empty chat component
 * function to retireve user chats
 */
function EmptyChat() {
	return (
		<div className={styles.empty}>
			<h1>You have no messages</h1>
		</div>
	)
}
function PreviewChat() {
	return (
		<div className={styles.preview}>
			<h1>Preview</h1>
		</div>
	)
}

export default function Chat() {
	const [empty, setEmpty] = useState(true)
	useEffect(() => {
		(async () => {
			const data = await GET_CHAT();
			if (data.chat_session.length > 0) {
				setEmpty(false);
			}
			console.log(data)
		})()
	}, [])
	return (
		<article className={styles.chat}>
			{empty ? <EmptyChat /> : <PreviewChat />}
		</article>
	)
}

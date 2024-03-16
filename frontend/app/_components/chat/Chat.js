'use client'

import styles from './chat.module.css'
import { useState, useEffect } from 'react'
import { GET_CHAT } from '../../_hooks/chatApi';
import { useAppSelector } from '../../../lib/hooks';
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

import { SELECTCHAT } from '../../../lib/features/selectChat/selectChatSlice';
import { useAppDispatch } from '../../../lib/hooks';
import { useRouter } from 'next/navigation';
function PreviewChat({ session }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const handleClick = () => {
		dispatch(SELECTCHAT({ chat: session }))
		router.push(`/chat/${session._id}`)
	}
	return (
		<div onClick={handleClick} className={styles.preview}>
			<h1>Preview</h1>
		</div>
	)
}

export default function Chat() {
	const [empty, setEmpty] = useState(true);
	const [chatSession, setChatSession] = useState([]);
	const token = useAppSelector(state => state.auth.token);
	const user = useAppSelector(state => state.auth.user);
	useEffect(() => {
		(async () => {
			const data = await GET_CHAT(user, token);
			if (data.chat_session.length > 0) {
				setEmpty(false);
			}
			console.log(data)
			setChatSession(data.chat_session);
		})()
	}, [])
	return (
		<article className={styles.chat}>
			{
				empty ?
					<EmptyChat /> :
					chatSession.map((session, index) => {
						return <PreviewChat
							id={session._id}
							key={index}
							session={session}
						/>

					})
			}
		</article>
	)
}

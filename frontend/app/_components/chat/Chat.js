'use client'

import styles from './chat.module.css'
import React, { useState, useEffect } from 'react'
import { GET_CHAT } from '../../_hooks/chatApi';
import { useAppSelector } from '../../../lib/hooks';

import { SELECTCHAT } from '../../../lib/features/selectChat/selectChatSlice';
import { useAppDispatch } from '../../../lib/hooks';
import { useRouter } from 'next/navigation';

function EmptyChat() {
	return (
		<div className={styles.empty}>
			<h1>You have no messages</h1>
		</div>
	)
}

function PreviewChat({ session }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const lastMessage = session.messages[session.messages.length - 1]
	const handleClick = () => {
		dispatch(SELECTCHAT({ chat: session }))
		router.push(`/chat/${session._id}`)
	}
	return (
		<div onClick={handleClick} className={styles.preview}>
			<h2> {lastMessage.message} </h2>
			<p> {new Date(lastMessage.timestamp).toUTCString()} </p>
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
			//console.log(data)
			setChatSession(data.chat_session);
		})()
	}, [])
	return (
		<article className={styles.chat}>
			{
				empty ?
					<EmptyChat /> :
					<React.Fragment>
						<h1>Messages</h1>
						{chatSession.map((session, index) => {
							return <PreviewChat
								id={session._id}
								key={index}
								session={session}
							/>

						})}
					</React.Fragment>
			}
		</article>
	)
}

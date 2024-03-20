'use client'

import { io } from "socket.io-client";
import { useEffect, useState } from 'react'
import styles from './chat.module.css'
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import { useRouter } from 'next/navigation';
import { SELECTCHAT } from '../../../lib/features/selectChat/selectChatSlice';
import CloseIcon from '@mui/icons-material/Close';

export default function Session() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const chat = useAppSelector(state => state.selectChat.chat)
	const user = useAppSelector(state => state.auth.user)
	const receiver = chat.members[0] === user ? chat.members[1] : chat.members[0]
	const [messages, setMessages] = useState(chat.messages);

	const socket = io(process.env.NEXT_PUBLIC_BACKEND);
	const handleJoin = () => {
		socket.emit("join_room", chat._id);
	}
	const sendMessage = async (e) => {
		e.preventDefault()
		const data = new FormData(e.target);
		e.target.reset()

		const msgData = {
			roomId: chat._id,
			sender_id: user,
			receiver_id: receiver,
			message: data.get('message'),
		};
		setMessages([...messages, { sender: user, message: data.get('message'), _id: Math.floor(Math.random() * 11) }]);
		socket.emit("send_message", msgData);
	}
	useEffect(() => {
		handleJoin();
		socket.on("receive_message", (chat) => {
			setMessages(chat.messages);
			dispatch(SELECTCHAT({ chat }));
		});
	}, [socket])
	return (
		<article className={styles.session}>
			<header>
				<h1> Chat   </h1>
				<div style={{ cursor: 'pointer' }} onClick={() => router.push('/chat')} > <CloseIcon /> </div>
			</header>
			{
				messages.map((message, index) => {
					return (
						<section
							style={message.sender === user ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }}
							key={index}
							className={styles.message_container}
						>
							<p className={styles.message}>
								{message.message}
							</p>
						</section>)
				})
			}
			<form onSubmit={sendMessage} >
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

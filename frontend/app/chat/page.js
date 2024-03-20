'use client'
import Dashboard from '../_components/Dashboard';
import ChatComponent from '../_components/chat/Chat';
import SideContent from '../_components/SideContent';
export default function Chat() {
	/**
	 * for every person in the chat, display div preview of last message
	 * on click open message
	 * bottom of the screen input prompt and send button
	 */
	return (
		<Dashboard>
			<ChatComponent />
			<SideContent />
		</Dashboard>

	)
}

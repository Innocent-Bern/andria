'use client'
/* requires the selected session*/
import Dashboard from '../../_components/Dashboard';
import Session from '../../_components/chat/Session';
export default function DisplayChat() {
	return (
		<Dashboard>
			<Session />
		</Dashboard>
	)
}

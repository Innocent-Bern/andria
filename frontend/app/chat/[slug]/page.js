'use client'

import Dashboard from '../../_components/Dashboard';
import SideContent from '../../_components/SideContent';
import Session from '../../_components/chat/Session';
export default function DisplayChat() {
	return (
		<Dashboard>
			<Session />
			<SideContent />
		</Dashboard>
	)
}

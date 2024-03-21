'use client'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import Link from 'next/link';
import { useAppDispatch } from '../../lib/hooks';
import { LOGOUT } from '../../lib/features/auth/authSlice';
import styles from "../page.module.css"

export default function NavigationBar() {
    ;
    const dispatch = useAppDispatch();

    const handleLogout = () => {

        dispatch(LOGOUT());
    }
    return (
        <div className={styles.Books_navigation}>
            <nav>
                <Link className={styles.selected} href={`/available_books`} >
                    <HomeOutlinedIcon className={styles.Navigation_icon} /> <span>Home</span>
                </Link>
                <Link href={`/profile`} >
                    <SentimentSatisfiedAltOutlinedIcon className={styles.Navigation_icon} /> <span>My Books</span>
                </Link>
                <Link href={`/add_book`} >
                    <AddCircleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Add</span>
                </Link>
                {/* <Link href='/ebooks' >
                    <MenuBookOutlinedIcon className={styles.Navigation_icon} /> <span>eBooks</span>
                </Link> */}
                <Link href='/chat' >

                    <ChatBubbleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Chat</span>
                </Link>
                <Link onClick={handleLogout} href={`/`} >
                    <ExitToAppOutlinedIcon className={styles.Navigation_icon} /> <span>Logout</span>
                </Link>
            </nav>
        </div>
    )
}

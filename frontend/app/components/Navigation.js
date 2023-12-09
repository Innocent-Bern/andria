'use client'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from "../page.module.css"

export default function NavigationBar() {
    let router = useRouter();
    let localUser;
    const { dispatch } = useAuthContext();

    if (typeof window !== "undefined") {
        localUser = JSON.parse(localStorage.getItem("user"));
    }

    const handleLogout = () => {

        dispatch({ type: "LOGOUT" })

        localStorage.removeItem("user");
        router.push("/");
    }
    return (
        <div className={styles.Books_navigation}>
            <nav>
                <Link className={styles.selected} href={`/available_books`} >
                    <HomeOutlinedIcon className={styles.Navigation_icon} /> <span>Home</span>
                </Link>
                <Link href={`/profile`} >
                    <SentimentSatisfiedAltOutlinedIcon className={styles.Navigation_icon} /> <span>Profile</span>
                </Link>
                <Link href={`/add_book`} >
                    <AddCircleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Add</span>
                </Link>
                <Link href={`/ebooks`} >
                    <MenuBookOutlinedIcon className={styles.Navigation_icon} /> <span>eBooks</span>
                </Link>
                <Link href={`/available_books`} >
                    <ChatBubbleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Chat</span>
                </Link>
                <Link onClick={handleLogout} href={`/`} >
                    <ExitToAppOutlinedIcon className={styles.Navigation_icon} /> <span>Logout</span>
                </Link>
            </nav>
        </div>
    )
}
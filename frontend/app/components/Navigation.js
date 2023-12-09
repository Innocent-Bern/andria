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
                <Link className={styles.selected} href={`/${localUser}/books`} >
                    <HomeOutlinedIcon className={styles.Navigation_icon} /> <span>Home</span>
                </Link>
                <Link href={`/${localUser}/profile`} >
                    <SentimentSatisfiedAltOutlinedIcon className={styles.Navigation_icon} /> <span>Profile</span>
                </Link>
                <Link href={`/${localUser}/addbook`} >
                    <AddCircleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Add</span>
                </Link>
                <Link href={`/${localUser}/books`} >
                    <MenuBookOutlinedIcon className={styles.Navigation_icon} /> <span>eBooks</span>
                </Link>
                <Link href={`/${localUser}/books`} >
                    <ChatBubbleOutlineOutlinedIcon className={styles.Navigation_icon} /> <span>Chat</span>
                </Link>
                <Link onClick={handleLogout} href={`/`} >
                    <ExitToAppOutlinedIcon className={styles.Navigation_icon} /> <span>Logout</span>
                </Link>
            </nav>
        </div>
    )
}
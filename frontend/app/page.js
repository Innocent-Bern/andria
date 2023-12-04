import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.Home}>
            <div className={styles.Home_content}>
                <h1>Share Books with People Near You</h1>
                <div className={styles.Home_btns}>
                    <Link href="/signup" ><button>Sign Up</button></Link>
                    <Link href="/login" ><button>Login</button></Link>
                </div>
            </div>
        </main>
    )
}
import Link from 'next/link'
import styles from './page.module.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
    return (
        <main className={styles.landing_page}>
            <section className={styles.Home}>
                <div className={styles.Home_content}>
                    <h1>Share Books with People Near You</h1>
                    <div className={styles.Home_btns}>
                        <Link href="/signup" ><button>Sign Up</button></Link>
                        <Link href="/login" ><button>Login</button></Link>
                    </div>
                </div>
            </section>
            {/* <section> 
                <div className={styles.Home_content}>
                    <h1>What is Andria?</h1>
                    <p>Andria is a platform where you can share books with people near you. </p>
                    <p>You can also search for books you want and borrow them from people near you.</p>
                </div>
            </section>
            <section>
                <div className={styles.Home_content}>
                    <h1>How does it work?</h1>
                    <p>Andria uses your location to find people near you who have the books you want. </p>
                    <p>You can then contact them to borrow the books.</p>
                </div>
            </section>
            <section>
                <div className={styles.Home_content}>
                    <h1>How do I get started?</h1>
                    <p>Click the sign up button above to create an account. </p>
                    <p>Once you have an account, you can start sharing books with people near you.</p>
                </div>
            </section>
            <sectionn className={styles.Home_link_section}>
                <div className={styles.Home_links}>
                    <a target='_blank' href="https://twitter.com/BlueSpeckledJim">
                        <TwitterIcon />
                    </a>
                    <a target='_blank' href="https://github.com/Innocent-Bern/andria">
                        <GitHubIcon />
                    </a>
                </div>
    </sectionn>*/}
        </main>
    )
}
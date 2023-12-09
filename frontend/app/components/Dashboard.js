import NavigationBar from "./Navigation";
import styles from '../page.module.css'

export default function Dashboard( { children } ) {
    return (
        <main className={styles.Books}>
            <NavigationBar />
            <div className={styles.Books_content}>
                { children }
            </div>
        </main>
    )
}
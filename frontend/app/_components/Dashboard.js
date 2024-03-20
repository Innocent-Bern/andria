import NavigationBar from "./Navigation";
import SideContent from "./SideContent";
import styles from '../page.module.css'
import requireAdminAuth from "../requireAuth";

function Dashboard({ children }) {
    return (
        <main className={styles.Books}>
            <NavigationBar />
            <div className={styles.Books_content}>
                {children}
            </div>
        </main>
    )
}

export default requireAdminAuth(Dashboard);

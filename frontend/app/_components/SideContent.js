'use client'

import styles from '../page.module.css'
import AsideBooks from './AsideBooks';
export default function SideContent() {
    return (
        <section className={styles.side_content}>
            <AsideBooks />
        </section>
    )
}

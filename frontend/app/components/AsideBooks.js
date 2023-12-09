import styles from "../page.module.css"

export default function AsideBooks({ getBooksData, handleSelectedBook }) {
    return (
        <div className={styles.aside_content}>
            <h2>Recent Adds</h2>
            {
                getBooksData &&
                getBooksData.books.map((book, index) => {
                    if (index < 3) {
                        return <img key={index} onClick={e => handleSelectedBook(book)} className={styles.recent_books} src={book.thumbnail_url} alt="recently added book image" />
                    }
                })
            }
        </div>
    )
}
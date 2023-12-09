import styles from "../page.module.css"

export default function BookDetails({ selectedBook, handleSelectedBook }) {
    return (
        <>
            <div className={styles.book_details_container}>
                <div className={styles.book_details}>
                    <button onClick={e => handleSelectedBook(false)} >Back</button>
                    <img src={selectedBook.thumbnail_url} alt="selected book image" />
                    <div className={styles.details}>
                        <h1>{selectedBook.title}</h1>
                        <p><span>Author: </span>{selectedBook.author}</p>
                        <p><span>Genre: </span>{selectedBook.genre}</p>
                    </div>
                </div>

                <div className={styles.available_copies}>
                    <h2>Available Copies</h2>
                    <div className={styles.copies}>
                        {
                            selectedBook.book_owners.map((image, index) => {
                                return <img key={index} src={image.image_url} alt="availble book copy image" />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
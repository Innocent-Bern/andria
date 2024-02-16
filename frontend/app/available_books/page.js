'use client'

import Dashboard from '../_components/Dashboard';
import BookDetails from '../_components/BookDetails';
import AsideBooks from '../_components/AsideBooks';
import styles from '../page.module.css'
import { GET_BOOKS_DB } from '../_hooks/getbooks';

import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AvailableBooks() {
    const [searchTitle, setSearchTitle] = useState("")
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null)
    const router = useRouter();

    const handleBookSearch = async (e) => {
        e.preventDefault();
        // Search for book in the db
    }
    useEffect(() => {
        (async () => {
            // Get available books from the db
            const data = await GET_BOOKS_DB();
            setBooks(data.available_books);
        })()
        console.log("I run once");
    }, [])
    
    const handleSelectedBook = (book) => {
        // toggle view when a books is selected
        // book ? setSelectedBook(book) : !selectedBook ? setSelectedBook(book) : setSelectedBook(null)
        // add book to local storage
        setSelectedBook(book)
        localStorage.setItem("selectedBook", JSON.stringify(book))
        router.push(`/available_books/${book._id}`)
    }

    return (
        <Dashboard>
            <div className={styles.available_books}>
                {
                    !selectedBook &&
                    (
                        <>
                            <header className={styles.available_books_header}>
                                <h1>Available Books</h1>
                                <form className={styles.search} onSubmit={handleBookSearch}>
                                    <input
                                        type="text"
                                        onChange={e => setSearchTitle(e.target.value)}
                                        value={searchTitle}
                                        placeholder='search'
                                    />
                                    <div onClick={handleBookSearch} className={styles.search_icon}>
                                        <SearchIcon />
                                    </div>
                                </form>
                            </header>

                            <div className={styles.display_books}>
                                <div className={styles.available_genres}>
                                    <div className={styles.genre}>ALL</div>
                                </div>

                                <div className={styles.books_container}>
                                    {books &&
                                        books.map((book, index) => {
                                            return <img onClick={e => handleSelectedBook(book)} className={styles.found_book} src={book.thumbnail_url} key={index} alt="book cover thumbnail" />
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    selectedBook && <BookDetails handleSelectedBook={handleSelectedBook} selectedBook={selectedBook} />
                }
                <div className={styles.side_books}>
                    <AsideBooks handleSelectedBook={handleSelectedBook} books={books} />
                </div>
            </div>
        </Dashboard>
    )
}

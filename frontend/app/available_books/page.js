'use client'

import Dashboard from '../_components/Dashboard';
import SideContent from '../_components/SideContent';
import styles from '../page.module.css'
import { GET_BOOKS_DB } from '../_hooks/getbooks';

import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { SELECTBOOK } from '../../lib/features/selectBook/selectBookSlice';

export default function AvailableBooks() {
    const [searchTitle, setSearchTitle] = useState("")
    const [books, setBooks] = useState([]);
    const router = useRouter();
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();

    const handleBookSearch = async (e) => {
        e.preventDefault();
        // Search for book in the db
    }
    useEffect(() => {
        (async () => {
            // Get available books from the db
            const data = await GET_BOOKS_DB(token);
            setBooks(data.available_books);
        })()
    }, [])

    const handleSelectedBook = (book) => {
        dispatch(SELECTBOOK({ book }))
        router.push(`/available_books/${book._id}`)
    }

    return (
        <Dashboard>
            <div className={styles.available_books}>
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
                                return <img
                                    onClick={() => handleSelectedBook(book)}
                                    className={styles.found_book} src={book.thumbnail_url}
                                    key={index} alt="book cover thumbnail"
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            <SideContent />
        </Dashboard>
    )
}

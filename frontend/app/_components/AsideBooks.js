'use client'

import styles from "../page.module.css"
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { useEffect, useState } from "react";
import { GET_BOOKS_DB } from "../_hooks/getbooks";
import { SELECTBOOK } from "../../lib/features/selectBook/selectBookSlice";
import { useRouter } from "next/navigation";

export default function AsideBooks() {
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();
    const [books, setBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await GET_BOOKS_DB(token);
            setBooks(data.available_books);
        })()
    }, [])

    const handleSelectedBook = (book) => {
        // add book to local storage
        dispatch(SELECTBOOK({ book }))
        router.push(`/available_books/${book._id}`)
    }
    return (
        <div className={styles.aside_content}>
            <h2>Recent Adds</h2>
            {
                books &&
                books.map((book, index) => {
                    if (index < 3) {
                        return <img
                            key={index}
                            onClick={e => handleSelectedBook(book)}
                            className={styles.recent_books}
                            src={book.thumbnail_url} alt="recently added book image" />
                    }
                })
            }
        </div>
    )
}

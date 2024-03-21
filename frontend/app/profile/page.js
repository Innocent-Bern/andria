'use client'
import React from 'react'
import styles from './profile.module.css'
import Dashboard from '../_components/Dashboard'
import { GET_USER_BOOKS } from '../_hooks/getbooks';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';

export default function Profile() {
  const [copyUrl, setCopyUrl] = useState(null);
  const [books, setBooks] = useState([]);
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = await GET_USER_BOOKS(user, token);
      setBooks(data.books);
    })()
  }, [])
  const displayUsersCopy = (owners) => {
    for (let owner of owners) {
      if (owner._id == user) {
        setCopyUrl(owner.image_url);
      }
    }
  }
  const toggleCopy = (e) => {
    if (e.target.id === "copy_display") {
      setCopyUrl(null);
    }
  }
  return (
    <Dashboard>
      <article className={styles.profile}>
        {
          copyUrl &&
          <section id="copy_display" onClick={(e) => toggleCopy(e)} className={styles.copy_display}>
            <div>
              <h1> Your Copy </h1>
              <img className={styles.copy_image} src={copyUrl} alt="your copy" />
            </div>
          </section>
        }
        {books.length === 0 ? <h1> No Books Found </h1> :
          <React.Fragment>
            <h1> My Books </h1>
            <section className={styles.books_container}>
              {
                books.map((book, index) => {
                  return <img
                    onClick={() => displayUsersCopy(book.book_owners)}
                    className={styles.user_books} src={book.thumbnail_url}
                    key={index} alt="book cover thumbnail"
                  />
                })}
            </section>
          </React.Fragment>
        }
      </article>
    </Dashboard>
  )
}

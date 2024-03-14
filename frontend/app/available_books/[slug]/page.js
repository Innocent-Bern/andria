'use client'

import Dashboard from "../../_components/Dashboard";
import { useEffect } from "react";
import styles from "../../page.module.css"
import { useState } from "react"
import WriteMessage from "../../_components/MessagePrompt";

export default function BookDetails() {
    const [copy, setCopy] = useState(null);

    let selectedBook;
    if (typeof window !== "undefined") {
        selectedBook = JSON.parse(localStorage.getItem("selectedBook"));
    }
    /**
     * useEffect(() => {
        if (copy) {
            console.log(copy)
        }
    }, [copy])
    **/
    return (
        <Dashboard>
            <div className={styles.book_details_container}>
                <div className={styles.book_details}>

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
                                return (
                                    <img
                                        onClick={(e) => setCopy(selectedBook.book_owners[e.target.id])}
                                        key={index} id={index} src={image.image_url} alt="availble book copy image" />)
                            })
                        }
                    </div>
                </div>

                {copy && <WriteMessage owner_id={copy._id} styles={styles} setCopy={setCopy} />}

            </div>
        </Dashboard>
    )
}

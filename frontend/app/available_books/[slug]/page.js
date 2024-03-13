'use client'

import Dashboard from "../../_components/Dashboard";
import styles from "../../page.module.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { GET_USER } from "../../_hooks/userdetails";
import CloseIcon from '@mui/icons-material/Close';
/**
 * create pop up with user email and option to write message*/

function WriteMessage({ setCopy }) {
    const toggle = (e) => {
        if (e.target.id === "message") {
            setCopy(null);
        }
    }
    const handleForm = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const message = data.get("message");
        console.log(message);
        setCopy(null);
    }
    return (
        <article id="message" onClick={(e) => toggle(e)} className={styles.message}>
            <section className={styles.message_container}>
                <div className={styles.message_header}>

                    <h1> Borrow Book </h1>
                    <div onClick={() => setCopy(null)}>
                        <CloseIcon />
                    </div>
                </div>
                <h2>Write owner a quick message</h2>
                <form onSubmit={handleForm} >
                    <input
                        type="text"
                        name="message"
                        placeholder="Enter message"
                        required
                    />
                    <button type="submit" className={styles.btn} >Send</button>
                </form>
            </section>
        </article>
    )
}

export default function BookDetails() {
    const router = useRouter();
    const [copy, setCopy] = useState(null);

    let selectedBook;
    if (typeof window !== "undefined") {
        selectedBook = JSON.parse(localStorage.getItem("selectedBook"));
    }
    //useEffect(() => {
    //console.log(`selected book: ${selectedBook}`);
    // }, [copy])
    return (
        <Dashboard>
            <div className={styles.book_details_container}>
                <div className={styles.book_details}>
                    {/* <button onClick={e => handleSelectedBook(false)} >Back</button> */}
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

                {copy && <WriteMessage setCopy={setCopy} />}

            </div>
        </Dashboard>
    )
}

'use client'

import styles from "../page.module.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { GET_USER } from "../hooks/userdetails";

export default function BookDetails({ selectedBook, handleSelectedBook }) {
    const router = useRouter();
    const [copy, setCopy] = useState(null);

    useEffect(() => {
        if (copy) {
            console.log(copy)
        }
    }, [copy])
    return (
        <>
            <div className={styles.book_details_container}>
                <div className={styles.book_details}>
                    <button onClick={e => handleSelectedBook(false)} >Back</button>
                    <img src={copy ? copy.image_url : selectedBook.thumbnail_url} alt="selected book image" />
                    <div className={styles.details}>
                        <h1>{selectedBook.title}</h1>
                        <p><span>Author: </span>{selectedBook.author}</p>
                        <p><span>Genre: </span>{selectedBook.genre}</p>
                    </div>
                    {/*
                        copy &&
                        <div className={styles.owner_details}>
                            <h2>Owner Details</h2>
                            <p><span>Name: </span>{copy.owner_name}</p>
                            <p><span>Location: </span>{copy.owner_location}</p>
                            <p><span>Contact: </span>{copy.owner_contact}</p>
                            <button onClick={() => router.push(`/chat/${copy.owner_id}`)}>Chat</button>
                        </div>*/
                    }
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
            </div>
        </>
    )
}
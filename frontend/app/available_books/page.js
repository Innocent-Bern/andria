'use client'

import Dashboard from '../components/Dashboard';
import BookDetails from '../components/BookDetails';
import AsideBooks from '../components/AsideBooks';
import styles from '../page.module.css'
import { GET_BOOKS_DB } from '../hooks/getbooks';
import { UPLOAD_IMAGE } from '../hooks/addbook';

import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';

export default function AvailableBooks() {
    const [searchTitle, setSearchTitle] = useState("")
    const [image, setImage] = useState(null);

    /*const handleBookSearch = (e) => {
        e.preventDefault()
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTitle}&key=AIzaSyDk1A-SkL-BV4f0a3Lzs8HiN7LZYDIVJwU`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }*/
    const handleImage = (e) => {
        setImage(e.target.files[0])       
    }
    useEffect(()=>{
        (async()=>{
            // Get available books from the db
            const data = await GET_BOOKS_DB();
            console.log(`Books: ${JSON.stringify(data)}`);
        })()
        if (image) {
            // test upload
            (async () => {
                const formData = new FormData();
                formData.append('testFile', image);
                const data = await UPLOAD_IMAGE(formData);
                console.log(`Image: ${JSON.stringify(data)}`);
            })()
        } 
    }, [image])

    const [selectedBook, setSelectedBook] = useState(null)
    const handleSelectedBook = (book) => {
        // toggle view when a books is selected
        book ? setSelectedBook(book) : !selectedBook ? setSelectedBook(book) : setSelectedBook(null)
        // console.log(selectedBook);
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
                                <form encType='multipart/form-data'>
                                    <input type='file' name='testFile' onChange={handleImage}/>
                                </form>
                                <form className={styles.search} /*onSubmit={handleBookSearch}*/>
                                    <input
                                        type="text"
                                        onChange={e => setSearchTitle(e.target.value)}
                                        value={searchTitle}
                                        placeholder='search'
                                    />
                                    <div /*onClick={handleBookSearch}*/ className={styles.search_icon}>
                                        <SearchIcon />
                                    </div>
                                </form>
                            </header>

                            <div className={styles.display_books}>
                                <div className={styles.available_genres}>
                                    <div className={styles.genre}>Fantasy</div>
                                </div>

                                <div className={styles.books_container}>
                                    {/*getBooksData &&
                                        getBooksData.books.map((book, index) => {
                                            return <img onClick={e => handleSelectedBook(book)} className={styles.found_book} src={book.thumbnail_url} key={index} alt="book cover thumbnail" />
                                        })
                                    */}
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    selectedBook && <BookDetails handleSelectedBook={handleSelectedBook} selectedBook={selectedBook} />
                }
                <div className={styles.side_books}>
                    <AsideBooks handleSelectedBook={handleSelectedBook} /*getBooksData={getBooksData}*/ />
                </div>
            </div>
        </Dashboard>
    )
}

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import styles from '../page.module.css'

import Dashboard from '../components/Dashboard';
import AsideBooks from '../components/AsideBooks';
import BookDetails from '../components/BookDetails';
import PreviewBookImage from '../components/PreviewBookImage';

import { GET_BOOK_GOOGLE, GET_BOOK_DB } from '../hooks/getbooks';
import { ADD_BOOK, UPDATE_BOOK_OWNERS } from '../hooks/addbook';

export default function AddBook() {
    const router = useRouter();

    let owner_id;
    if (typeof window !== "undefined") {
        owner_id = JSON.parse(localStorage.getItem("user"));
    }

    const [searchTitle, setSearchTitle] = useState("")
    const [searchAuthor, setSearchAuthor] = useState("")
    const [previewSrc, setPreviewSrc] = useState(null);


    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)

    const [foundBooks, setFoundBooks] = useState()
    const [selectedDisplay, setSelectedDisplay] = useState({ display: "none" })

    useEffect(() => {
        // populate page with default books from Books API
        findBook();
    }, [])


    const toggleSelectedDisplay = (e) => {
        if (e.target.className == styles.found_book || e.target.className == styles.selected_found_book || e.target.className == styles.found_book_cancel) {
            selectedDisplay.display === "none" ? setSelectedDisplay({ display: "flex" }) : setSelectedDisplay({ display: "none" });
            setPreviewSrc(null);
            setImage(null);
        }
    }

    const findBook = async (e) => {
        // check if book is in database
        const booksDB = await GET_BOOK_DB(searchTitle, searchAuthor);

        if (booksDB.found_books.length > 0) {
            // display found_books
            let found_books = booksDB.found_books;
            const handleSelectBook = (e) => {
                selectedDisplay.display === "none" ? setSelectedDisplay({ display: "flex" }) : setSelectedDisplay({ display: "none" });

                let selected = found_books[e.target.id]
                console.log(`Target: ${JSON.stringify(selected)}`);
                setThumbnail(selected.thumbnail_url);
                setTitle(selected.title);
                setGenre(selected.genre);
                setAuthor(selected.author);
            }
            setFoundBooks(
                booksDB.found_books.map((book, index) => {
                    return (
                        <img onClick={e => handleSelectBook(e)} className={styles.found_book} id={index} key={index} src={book.thumbnail_url} />
                    )
                })
            )
        } else {
            // Get details from google books API
            const res = await GET_BOOK_GOOGLE(searchTitle, searchAuthor);

            if (res.data.totalItems === 0) {
                // update later to display form requiring manual entry of book details
                return setFoundBooks(<h1>Sorry, book not found</h1>)
            }
            const handleSelectBook = (e) => {
                selectedDisplay.display === "none" ? setSelectedDisplay({ display: "flex" }) : setSelectedDisplay({ display: "none" });

                let selected = res.data.items[e.target.id].volumeInfo
                setThumbnail(selected.imageLinks.thumbnail)
                selected.title ? setTitle(selected.title) : setTitle(<input type="text" />);
                selected.categories ? setGenre(selected.categories[0]) : setGenre(<input type="text" placeholder="Add genre" />);
                selected.authors ? setAuthor(() => {
                    let author = ""

                    selected.authors.forEach((element, index) => {
                        index == selected.authors.length - 1 ? author += element : author += `${element}, `;
                    });

                    return author
                }) : setAuthor(<input type="text" placeholder="Add Author(s)" />);
                if (selected.description) {
                    setDescription(selected.description.slice(0, 400) + ".....")
                }
            }

            setFoundBooks(
                res.data.items.map((book, index) => {
                    if (!book.volumeInfo.imageLinks) {
                        return // default for blank thumbnail
                    }
                    return (
                        <img onClick={e => handleSelectBook(e)} className={styles.found_book} id={index} key={index} src={book.volumeInfo.imageLinks.thumbnail} />
                    )
                })
            )
        }
    }
    const handleFindBook = (e) => {
        e.preventDefault();
        findBook();
    }

    const handleUploadBook = async (e) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('owner_id', owner_id);
        formData.append('thumbnail_url', thumbnail)
        formData.append('file', image);

        const response = new Promise((resolve) => {
            const res = ADD_BOOK(formData)
            if (res) {
                resolve(res);
            }
        })
        await response.then((res) => {
            if (res.error) {
                // console.log(res.error);
                alert("Upload failed. Try again");
            } else {
                alert("Book added successfully");
                router.push('/available_books');
            }
        })


    }
    /*----------------------------handle aside books-------------------------------------------------*/
    const [selectedBook, setSelectedBook] = useState(null)
    const handleSelectedBook = (book) => {
        book ? setSelectedBook(book) : !selectedBook ? setSelectedBook(book) : setSelectedBook(null)
    }
    /*-----------------------------------------------------------------------------*/
    return (
        <Dashboard >
            <div className={styles.Add_book}>
                {!selectedBook &&
                    <>
                        <header>
                            <h1>Find book you wish to add</h1>
                        </header>
                        <form onSubmit={handleFindBook} className={styles.find_book}>
                            <input
                                type="text"
                                onChange={e => setSearchTitle(e.target.value)}
                                value={searchTitle}
                                placeholder="Book Title"
                            />
                            <input
                                type="text"
                                onChange={e => setSearchAuthor(e.target.value)}
                                value={searchAuthor}
                                placeholder="Book Author"
                            />
                            <button>Find</button>
                        </form>
                        <div className={styles.found_books}>
                            {foundBooks}
                        </div>

                        <div onClick={e => toggleSelectedDisplay(e)} style={selectedDisplay} className={styles.selected_found_book}>

                            <div style={selectedDisplay} className={styles.found_book_details}>
                                <div className={styles.found_booK_controll}>
                                    <h2>Book Details</h2>
                                    <div onClick={e => toggleSelectedDisplay(e)} className={styles.found_book_cancel}>
                                        Cancel
                                        <ClearOutlinedIcon />
                                    </div>
                                </div>
                                <div className={styles.selected_found_book_images}>
                                    <img className={styles.selected_book_image} src={thumbnail} />
                                    <PreviewBookImage previewSrc={previewSrc} setPreviewSrc={setPreviewSrc} setImage={setImage} />
                                </div>

                                <div className={styles.selected_found_book_details}>
                                    <p className={styles.selected_title}> <span>Book Title:</span> {title} </p>
                                    <p className={styles.selected_author}> <span>Book Author:</span> {author} </p>
                                    <p className={styles.selected_genre}> <span>Book Genre:</span> {genre} </p>
                                    {
                                        description && 
                                        <p className={styles.selected_description}> <span>Book Description:</span> {description} </p>
                                    }
                                </div>
                                {
                                    image &&
                                    <div onClick={handleUploadBook} className={styles.add_selected_book_btn}>Add Book</div>
                                }
                            </div>
                        </div>
                    </>
                }
                {
                    selectedBook && <BookDetails handleSelectedBook={handleSelectedBook} selectedBook={selectedBook} />
                }
                <div className={styles.add_book_aside}>
                    <AsideBooks handleSelectedBook={handleSelectedBook} /*getBooksData={getBooksData}*/ />
                </div>

                <form style={{ display: "none" }}>

                    <label>Book title </label>
                    <input
                        type="text"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                    />

                    <label>Book Author </label>
                    <input
                        type="text"
                        onChange={(e) => { setAuthor(e.target.value) }}
                        value={author}
                    />

                    <label>Book Genre </label>
                    <input
                        type="text"
                        onChange={(e) => { setGenre(e.target.value) }}
                        value={genre}
                    />

                    <label >Image file</label>
                    <input type="file" name="file" /*onChange={handleImage} */ />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </Dashboard>
    )
}
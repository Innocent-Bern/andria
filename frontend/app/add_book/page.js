'use client'

import Dashboard from '../components/Dashboard';
import AsideBooks from '../components/AsideBooks';
import BookDetails from '../components/BookDetails';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import { GET_BOOK_GOOGLE, GET_BOOK_DB } from '../hooks/getbooks';
import { UPLOAD_IMAGE, ADD_BOOK } from '../hooks/addbook';

export default function AddBook() {
    const router = useRouter();

    let owner_id;
    if (typeof window !== "undefined") {
        owner_id = JSON.parse(localStorage.getItem("user"));
    }

    /*----------------------------handle aside books-------------------------------------------------*/
    // const { loading, error, data: getBooksData } = useQuery(GET_BOOKS);
    const [selectedBook, setSelectedBook] = useState(null)
    const handleSelectedBook = (book) => {
        book ? setSelectedBook(book) : !selectedBook ? setSelectedBook(book) : setSelectedBook(null)
    }
    /*-----------------------------------------------------------------------------*/

    const [searchTitle, setSearchTitle] = useState("")
    const [searchAuthor, setSearchAuthor] = useState("")

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)

    const [foundBooks, setFoundBooks] = useState()
    const [selectedDisplay, setSelectedDisplay] = useState({ display: "none" })


    // handle file change
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        if (image) {
            // upload image to cloud storage
            (async () => {
                const formData = new FormData();
                formData.append('file', image);
                const data = await UPLOAD_IMAGE(formData);
                setImageName(data.fileName);
                setImageUrl(data.publicUrl);
            })()
        } else {
        // populate page with default books from Books API
        findBook();
    }
    }, [image])


    const handleClick = (e) => {
        if (e.target.className == styles.found_book || e.target.className == styles.selected_found_book || e.target.className == styles.found_book_cancel) {
            selectedDisplay.display === "none" ? setSelectedDisplay({ display: "flex" }) : setSelectedDisplay({ display: "none" });
            // if (imageDetails) deletePhotoAWS(imageDetails.image_key).then(setImageFile(null)) // delete photo from cloud storage
        }
    }

    const findBook = async (e) => {
        // check if book is in database
        let booksDB = await GET_BOOK_DB(searchTitle, searchAuthor);
        booksDB = JSON.stringify(booksDB);
        
        if (booksDB.found_books) {

        } else {
            const res = await GET_BOOK_GOOGLE(searchTitle, searchAuthor);
            if (res.data.totalItems === 0) {
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
    const dropHandler = (e) => {
        // prevent files from being opened: Default behaviour
        e.preventDefault()

        // ensure user uploads a single file
        if (e.dataTransfer.items.length > 1) {
            return alert("Upload a single photo")
        }

        // check if it's a file 
        if (e.dataTransfer.items[0].kind !== "file") {
            return alert("Upload an image file")
        }

        // check if it's a jpeg or png file
        let uploadedFile = e.dataTransfer.items[0].getAsFile()
        const fileType = uploadedFile["type"]
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(fileType)) {
            return alert("Upload a JPEG or PNG file")
        }
    }

    const dragOverHandler = (e) => {
        // prevent files from being opened: Default behaviour
        e.preventDefault()
    }


    const handleUploadBook = async (e) => {
        const book_details = {
            title: title,
            author: author,
            genre: genre,
            author: author,
            thumbnail_url: thumbnail,
            owner_id: owner_id,
            image_name: imageName,
            image_url: imageUrl
        }
        await ADD_BOOK(book_details)
            .then(()=> {
                router.push('/available_books');
            })
        
    }

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

                        <div onClick={e => handleClick(e)} style={selectedDisplay} className={styles.selected_found_book}>

                            <div style={selectedDisplay} className={styles.found_book_details}>
                                <div className={styles.found_booK_controll}>
                                    <h2>Book Details</h2>
                                    <div onClick={e => handleClick(e)} className={styles.found_book_cancel}>
                                        Cancel
                                        <ClearOutlinedIcon />
                                    </div>
                                </div>
                                <div className={styles.selected_found_book_images}>

                                    <img className={styles.selected_book_image} src={thumbnail} />

                                    <div onDrop={e => dropHandler(e)} onDragOver={e => dragOverHandler(e)} className={styles.drop_zone}>
                                        {imageUrl && <img src={imageUrl} alt="book image" />}
                                        {!imageName &&
                                            <div className={styles.drop_zone_details}>
                                                <p>Add Picture of Your book</p>
                                                <form encType='multipart/form-data'>
                                                    <input type='file' name='file' onChange={handleImage} />
                                                </form>
                                                <p className={styles.drag_option}>Or drag and drop</p>
                                            </div>}
                                    </div>

                                </div>

                                <div className={styles.selected_found_book_details}>
                                    <p className={styles.selected_title}> <span>Book Title:</span> {title} </p>
                                    <p className={styles.selected_author}> <span>Book Author:</span> {author} </p>
                                    <p className={styles.selected_genre}> <span>Book Genre:</span> {genre} </p>
                                    {description && <p className={styles.selected_description}> <span>Book Description:</span> {description} </p>}
                                </div>
                                <div onClick={handleUploadBook} className={styles.add_selected_book_btn}>Add Book</div>
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
                    <input type="file" name="file" onChange={handleImage} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </Dashboard>
    )
}
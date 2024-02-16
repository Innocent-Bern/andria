'use client'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import styles from '../page.module.css';

export default function PreviewBookImage({previewSrc, setPreviewSrc, setImage}) {

    const handleImage = (e) => {
        // setImage(e.target.files[0])
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewSrc(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setPreviewSrc(null);
        }
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
    const handleRejectImage = (e) => {
        setPreviewSrc(null);
        setImage(null);
    }
    return (
        <div onDrop={e => dropHandler(e)} onDragOver={e => e.preventDefault()} className={styles.drop_zone}>
            {
                previewSrc &&
                <div className={styles.drop_zone_img_container}>
                    <img src={previewSrc} alt="book image" />
                    <CancelOutlinedIcon className={styles.drop_zone_cancel} onClick={() => handleRejectImage()} />
                </div>
            }
            {
                !previewSrc &&
                <div className={styles.drop_zone_details}>
                    <p>Add Picture of Your book</p>
                    <form encType='multipart/form-data'>
                        <input type='file' accept='.jpg, .jpeg, .png' name='file' onChange={handleImage} />
                    </form>
                    <p className={styles.drag_option}>Or drag and drop</p>
                </div>
            }
        </div>
    )
}
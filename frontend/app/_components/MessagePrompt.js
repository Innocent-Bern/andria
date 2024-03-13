'use client'

import CloseIcon from '@mui/icons-material/Close';


export default function WriteMessage({ setCopy, styles }) {
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
                <h2>Write owner a message</h2>
                <form onSubmit={handleForm} >
                    <textarea
                        name="message"
                        rows="3"
                        cols="30"
                        required
                        placeholder="Enter message"
                    >

                    </textarea>
                    <button type="submit" className={styles.btn} >Send</button>
                </form>
            </section>
        </article>
    )
}

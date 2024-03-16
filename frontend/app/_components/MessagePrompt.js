'use client'

import CloseIcon from '@mui/icons-material/Close';
import { ADD_MESSAGE } from '../_hooks/chatApi';
import { useAppSelector } from '../../lib/hooks';

export default function WriteMessage({ setCopy, styles, owner_id }) {
    const user = useAppSelector(state => state.auth.user);
    const token = useAppSelector(state => state.auth.token);
    const toggle = (e) => {
        if (e.target.id === "message") {
            setCopy(null);
        }
    }
    const handleForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const message = data.get("message");

        await ADD_MESSAGE(message, owner_id, user, token)
            .then((data) => {
                if (data.same_user_error) {
                    alert(data.same_user_error)
                } else if (data.error) {
                    //console.log(data.error);
                    throw data.error
                } else {
                    //console.log(data);
                    alert("Message sent")
                }
            }).catch(err => {
                console.log(err);
                alert("An error occurred. Please try again.")
            })
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

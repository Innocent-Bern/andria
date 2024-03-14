'use client'

import { useState } from 'react'
import styles from '../page.module.css'
import { SIGNUP } from '../_hooks/userauth'
import { useAuthContext } from '../_hooks/useAuthContext'
import { useRouter } from 'next/navigation'

export default function Signup() {
    // User sign up page
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter();


    const handleSubmit = async (e) => {
        // Handle form submission
        e.preventDefault()
        const data = new FormData(e.target);
        const email = data.get("email");
        const password = data.get("password");

        setLoading(true);
        setError(null);
        await SIGNUP(email, password)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    const user = data.user_id;
                    const token = data.token;

                    // Add user to local storage
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", JSON.stringify(token));

                    dispatch({ type: "LOGIN", payload: user })

                    // Redirect to available books page
                    router.push('/available_books')
                }
                setLoading(false);
            }).catch(err => {
                setError("An error occurred. Please try again.");
                setLoading(false);
            })
    }
    return (
        <main className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={handleSubmit} autoComplete='off'>
                <h1>Sign up</h1>
                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                {error && <p className={styles.sign_error}>{error}</p>}
                {loading ?
                    <button type="submit" disabled>Sign Up</button> :
                    <button type="submit">Sign up</button>}
            </form>
        </main>
    )
}

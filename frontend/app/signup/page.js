'use client'

import { useState } from 'react'
import styles from '../page.module.css'
import { SIGNUP } from '../hooks/userauth'
import { useAuthContext } from '../hooks/useAuthContext'
import { useRouter } from 'next/navigation'

export default function Signup() {
    // User sign up page
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();


    const handleSubmit = async (e) => {
        // Handle form submission
        e.preventDefault()
        const user = await SIGNUP(email, password)
        dispatch({ type: "LOGIN", payload: user })
        router.push('/available_books');
    }
    return (
        <main className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={handleSubmit} autoComplete='off'>
                <h1>Sign up</h1>
                <label>Email Address</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email Address"
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

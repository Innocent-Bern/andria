'use client'

import { useState } from 'react'
import styles from '../page.module.css'
import { SIGNUP } from '../hooks/userauth'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Signup() {
    // User sign up page
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e) => {
        // Handle form submission
        e.preventDefault()
        const user = SIGNUP("innocentbern1235@gmail.com", "@Jnduta1980")
        console.log(`Signed user is: ${user}`);
        dispatch({ type: "LOGIN", payload: user })

    }
    return (
        <main className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={handleSubmit}>
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

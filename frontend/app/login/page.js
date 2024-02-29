'use client'

import { useState } from "react"
import styles from "../page.module.css"
import { LOGIN } from "../_hooks/userauth";
import { useAuthContext } from "../_hooks/useAuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const { dispatch } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError(null);
        await LOGIN(email, password)
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
        <div className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={handleSubmit} autoComplete="off">
                <h1>Login</h1>
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

                {error && <p className={styles.sign_error}>{error}</p>}
                {loading ?
                    <button type="submit" disabled>Login</button> :
                    <button type="submit">Login</button>}
            </form>
        </div>
    )
}
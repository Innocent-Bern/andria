'use client'

import { useState } from "react"
import styles from "../page.module.css"
import { LOGIN } from "../hooks/userauth";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
    const {dispatch} = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = LOGIN(email, password);
        dispatch({ type: "LOGIN", payload: user })
    }
    return (
        <div className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={ handleSubmit }>
                <h1>Login</h1>
                <label>Email Address</label>
                <input 
                    type="email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    placeholder="Email Address"
                    required
                />
                <label>Password</label>
                <input 
                    type="password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
'use client'

import { useState } from "react"
import styles from "../page.module.css"
import { LOGIN } from "../_hooks/userauth";
import { useAuthContext } from "../_hooks/useAuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const {dispatch} = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await LOGIN(email, password);
        dispatch({ type: "LOGIN", payload: user });
        router.push('/available_books');
    }
    return (
        <div className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={ handleSubmit } autoComplete="off">
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
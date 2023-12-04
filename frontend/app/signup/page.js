'use client'

import { useState } from 'react'
import styles from '../page.module.css'

export default function Signup() {
    // User sign up page
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = (e)=>{
        // Handle form submission
        e.preventDefault()
        /*signupUser(
            {
                variables: {email: email, password: password},
                onCompleted : (data)=>{
                    // Add user to local storage\
                    const user = data.signupUser.user.id
                    const token = data.signupUser.token
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", JSON.stringify(token))

                    // update the user auth context
                    dispatch({type: "LOGIN", payload: user})

                    // redirect to available books page
                    navigate(`/${user}/books`, { replace: true });
                }
            }
        )*/       

    }
    return (
        <main className={styles.Signup}>
            <form className={styles.Signup_form} onSubmit={ handleSubmit }>
                <h1>Sign up</h1>
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
        </main>
    )
}

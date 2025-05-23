'use client';

import {useState} from 'react';
import styles from '@/app/components/account.module.css'
import {jersey10} from "@/app/fonts.js";

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const role = 'user'

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Signup failed');
                return;
            }

            window.location.href = data.role === 'Administrator' ? '/admin-dashboard' : '/user-dashboard';

        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <h1 className={jersey10.className + ' ' + styles.title}>Signup</h1>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.inputField}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button
                    type="submit"
                    className={styles.loginButton}
                >
                    Sign Up
                </button>
            </form>
            <p>Already have an account? Log in <a href="/login" className={styles.navLink}>here</a></p>
        </div>
    );
}

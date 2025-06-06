'use client';

import {useState} from 'react';
import styles from '@/app/components/account.module.css'
import {jersey10} from "@/app/fonts.js";
import TwoFactorLoginModal from "@/app/components/two-factor-login-modal.jsx";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show2FALoginModal, setShow2FALoginModal] = useState(false);
    const [tempToken, setTempToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Login failed');
                return;
            }

            if(!data.requires2FA)
                window.location.href = data.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
            else {
                setTempToken(data.token);
                setShow2FALoginModal(true);
            }

        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div>
            {show2FALoginModal &&
                <TwoFactorLoginModal
                    onClose={() => setShow2FALoginModal(false)}
                    token={tempToken}
                />}
            <div className={styles.mainContainer}>
                <h1 className={jersey10.className + ' ' + styles.title}>Login</h1>
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
                        Log In
                    </button>
                </form>
                <p>Don't have an account? Register <a href="/register" className={styles.navLink}>here</a></p>
            </div>
        </div>
    );
}

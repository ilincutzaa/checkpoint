'use client'

import {useState} from "react";
import styles from "./modal.module.css"
import {useRouter} from "next/navigation";

export default function TwoFactorLoginModal({onClose, token}) {
    const [userCode, setUserCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleVerify = async () => {
        const res = await fetch('/api/2fa/verify-login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code: userCode, tempToken: token}),
        })

        const data = await res.json()

        if(!res.ok)
            setError(data.error || 'Invalid code')
        else {
            router.push('/user-dashboard')
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <p>Open your Authenticator app, then enter the 6-digit code below:</p>
                <input
                    type="text"
                    value={userCode}
                    onChange={(e) => {setUserCode(e.target.value)}}
                    maxLength={6}
                    placeholder="123456"
                    style={{ margin: '1rem 0', padding: '0.5rem', width: '100%' }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className={styles.button}
                        onClick={handleVerify}
                >Verify</button>
                <button onClick={onClose} className={styles.button}>Close</button>
            </div>
        </div>
    )
}
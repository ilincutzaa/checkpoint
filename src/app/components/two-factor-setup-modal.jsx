'use client'

import {useEffect, useState} from "react";
import styles from "./modal.module.css"

export default function TwoFactorSetupModal({onClose, on2faVerified}) {
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [userCode, setUserCode] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        fetch('/api/2fa/setup', {
            method: 'POST',
        })
            .then(res => res.json())
            .then(data => setQrCodeUrl(data.qrCodeImageUrl))
            .catch(() => setError('Failed to load QR code'));
    }, [])

    const handleVerify = async () => {
        setVerifying(true);
        const res = await fetch('/api/2fa/verify', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code: userCode}),
        })

        const data = await res.json()

        if(!res.ok)
            setError(data.error || 'Invalid code')
        else {
            setSuccess(true)
            on2faVerified();
            setError('');
        }
        setVerifying(false);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h2>Enable 2FA</h2>
                {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="QR Code"
                         style={{ margin: '1rem auto' }}
                    />
                )}
                <p>Scan this QR code in your Authenticator app, then enter the 6-digit code below:</p>
                <input
                    type="text"
                    value={userCode}
                    onChange={(e) => {setUserCode(e.target.value)}}
                    maxLength={6}
                    placeholder="123456"
                    style={{ margin: '1rem 0', padding: '0.5rem', width: '100%' }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success ? (
                    <p style={{ color: 'lightgreen' }}>2FA enabled successfully!</p>
                ) : (
                    <button className={styles.button}
                            onClick={handleVerify}
                            disabled={verifying || success}
                    >{success ? "Verified ✅" : "Verify"}</button>
                )}
                <button onClick={onClose} className={styles.button}>Close</button>
            </div>
        </div>
    )
}
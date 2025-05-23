'use client';
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';
import {jersey10} from "@/app/fonts.js";
import {useEffect, useState} from "react";
import LogoutButton from "@/app/components/logout-button.jsx";

export default function Home() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const res = await fetch('/api/me');
            const data = await res.json();
            setIsLoggedIn(data.loggedIn);
        };
        checkLogin();
    }, []);


    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleSignupClick = () => {
        router.push('/register');
    };

    const handleDashboardClick = () => {
        router.push('/user-dashboard');
    };

    return (
        <div className={jersey10.className}>
            <div className={styles.main}>
                <div className={styles.topBorder}>
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={handleDashboardClick}
                                className={styles.loginButton}
                            >
                                See Dashboard
                            </button>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className={styles.loginButton}
                            >
                                Login
                            </button>
                            <button
                                onClick={handleSignupClick}
                                className={styles.signupButton}
                            >
                                Signup
                            </button>
                        </>
                    )}
                </div>

                <div className={styles.mainContent}>
                    <h1 className={styles.title}>Checkpoint</h1>
                    <h2 className={styles.welcomeText}>A personal game progress tracker!</h2>
                </div>
            </div>
        </div>

    );
}

'use client'
import styles from "@/app/user-dashboard/page.module.css";
import LogoutButton from "@/app/components/logout-button.jsx";

export default function AdminDashboard() {
    return (
        <main className={styles.main}>
            <LogoutButton />
            <p>Hey admin!</p>
        </main>
    );
}

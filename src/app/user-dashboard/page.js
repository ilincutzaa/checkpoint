'use client'

import GameList from "@/app/components/game-list";
import styles from "@/app/user-dashboard/page.module.css"
import StatusBanner from "@/app/components/status-banner";
import LogoutButton from "@/app/components/logout-button.jsx";

export default function UserDashboard() {
    return (
        <main className={styles.main}>
            <LogoutButton />
            <StatusBanner/>
            <GameList />
        </main>
    );
}
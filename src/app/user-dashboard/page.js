'use client'

import GameList from "@/app/components/game-list";
import styles from "@/app/user-dashboard/page.module.css"
import StatusBanner from "@/app/components/status-banner.jsx";
import ProfileMenu from "@/app/components/profile-menu.jsx";

export default function UserDashboard() {
    return (
        <main className={styles.main}>
            <div className={styles.topBar}>
                <StatusBanner/>
                <ProfileMenu/>
            </div>
            <GameList />
        </main>
    );
}
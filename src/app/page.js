import {GameList} from "@/app/components/game-list";
import styles from "@/app/page.module.css"
import StatusBanner from "@/app/components/status-banner";

export default function Home() {
    return (
        <main className={styles.main}>
            <StatusBanner/>
            <GameList />
        </main>
    );
}
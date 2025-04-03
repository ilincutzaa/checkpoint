import {GameList} from "@/app/components/game-list";
import styles from "@/app/page.module.css"

export default function Home() {
    return (
        <main className={styles.main}>
            <GameList />
        </main>
    );
}
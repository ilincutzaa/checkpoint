'use client'

import {useSearchParams} from "next/navigation";
import styles from "@/app/detail/page.module.css"
import {GameDetail} from "@/app/components/game-detail";

export default function Detail() {
    const searchParams = useSearchParams();
    const selectedGameID = searchParams.get("id");

    return (
        <main className={styles.main}>
            <GameDetail selectedGameID={selectedGameID} />
        </main>
    )
}
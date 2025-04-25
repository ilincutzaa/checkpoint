'use client'

import {useSearchParams} from "next/navigation";
import {GameUpdateForm} from "@/app/components/game-update-form";
import styles from "@/app/update/page.module.css"

export default function Update () {
    const searchParams = useSearchParams();

    const selectedGameID = searchParams.get("id");

    return (
        <main className={styles.main}>
            <GameUpdateForm selectedGameID={selectedGameID} />
        </main>
    )
}
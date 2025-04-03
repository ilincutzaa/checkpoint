'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useGames} from "@/app/context/games-context";
import {GameUpdateForm} from "@/app/components/game-update-form";
import styles from "@/app/update/page.module.css"

export default function Update () {
    const searchParams = useSearchParams();
    const {games} = useGames();
    const router = useRouter();

    const gameId = searchParams.get("id");
    const selectedGame = games.find(x => x.id === gameId);

    if (!selectedGame) {
        router.push("/");
        return null;
    }

    return (
        <main className={styles.main}>
            <GameUpdateForm selectedGame={selectedGame} />
        </main>
    )
}
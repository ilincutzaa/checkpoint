'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useGames} from "@/app/context/games-context";
import styles from "@/app/detail/page.module.css"

export default function Detail () {
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
            <div className={styles.info}>
                <h1>{selectedGame.name}</h1>
                <p>Genre: {selectedGame.genre}</p>
                <p>Platform: {selectedGame.platform}</p>
                <p>Backlog Priority: {selectedGame.backlogPriority}</p>
                <p>Your total game time is {selectedGame.hoursPlayed} hours</p>
                <p>You finished this game {selectedGame.timesCompleted} times</p>
                <p>Completion Type: {selectedGame.completionType}</p>
                <p>Status: {selectedGame.status}</p>
                <p>You finished this game for the first time on {selectedGame.dateFirstFinished}</p>
                <p>You gave this game {selectedGame.rating} stars</p>
                <p>You described this game as: {selectedGame.description}</p>
            </div>

            <div>
                <button className={styles.button}
                        onClick={() => {
                            router.push("/")
                        }}
                >Back
                </button>
            </div>
        </main>
    )
}
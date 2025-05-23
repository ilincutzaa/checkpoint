import {useEffect, useState} from "react";
import styles from "@/app/components/game-detail.module.css";
import {useRouter} from "next/navigation";


export default function GameDetail({selectedGameID}) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);

    const router = useRouter();
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`/api/games/${selectedGameID}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch game');
                }
                const game = await response.json();
                setSelectedGame(game);
            } catch (error) {
                console.error('Error fetching game:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchGame();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if(selectedGame == null) {
        console.error('Error fetching game with id:' + selectedGameID);
        return <h1>404 - Page Not Found</h1>
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
                            router.back()
                        }}
                >Back
                </button>
            </div>
        </main>
    )
}
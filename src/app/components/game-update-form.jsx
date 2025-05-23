'use client';

import {useRouter} from "next/navigation";
import {createGameSchema} from "@/app/schemas/game-schema.jsx";
import {useEffect, useState} from "react";
import styles from "@/app/components/game-form.module.css";
import {enqueueRequest} from "@/app/utils/requests-queue";
import {useConnectionStable} from "@/app/hooks/connection-status";

export default function GameUpdateForm({selectedGameID}){
    const router = useRouter();

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [platform, setPlatform] = useState("");
    const [backlogPriority, setBacklogPriority] = useState(0);

    const [hoursPlayed, setHoursPlayed] = useState(0);
    const [timesCompleted, setTimesCompleted] = useState(0);
    const [completionType, setCompletionType] = useState("");
    const [status, setStatus] = useState("");

    const [dateFirstFinished, setDateFirstFinished] = useState("");
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [selectedGame, setSelectedGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isConnectionStable = useConnectionStable();


    console.log(selectedGameID);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`/api/games/${selectedGameID}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch game');
                }
                const game = await response.json();
                setSelectedGame(game);

                if(game) {
                    setName(game.name);
                    setGenre(game.genre);
                    setPlatform(game.platform);
                    setBacklogPriority(game.backlogPriority);
                    setHoursPlayed(game.hoursPlayed);
                    setTimesCompleted(game.timesCompleted);
                    setStatus(game.status);
                    if (game.dateFirstFinished) {
                        const date = new Date(game.dateFirstFinished);
                        const localISO = date.toISOString().slice(0, 16);
                        setDateFirstFinished(localISO);
                    } else {
                        setDateFirstFinished("");
                    }
                    setRating(game.rating);
                    setDescription(game.description);
                    setCompletionType(game.completionType);
                }
            } catch (error) {
                console.error('Error fetching game:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchGame();

    }, [selectedGameID]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if(selectedGame == null) {
        console.error('Error fetching game with id:' + selectedGameID);
        return <h1>404 - Page Not Found</h1>
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            createGameSchema.parse({
                name,
                genre,
                platform,
                backlogPriority: Number(backlogPriority),
                hoursPlayed: Number(hoursPlayed),
                timesCompleted: Number(timesCompleted),
                completionType,
                status,
                dateFirstFinished,
                rating: Number(rating),
                description,
            });

            console.log({
                name,
                genre,
                platform,
                backlogPriority,
                hoursPlayed,
                timesCompleted,
                completionType,
                status,
                dateFirstFinished,
                rating,
                description,
            });


            const updatedGame = {
                id: selectedGameID,
                name,
                genre,
                platform,
                backlogPriority,
                hoursPlayed,
                timesCompleted,
                completionType,
                status,
                dateFirstFinished: dateFirstFinished ? dateFirstFinished : null,
                rating,
                description,
            };

            const request = {
                method: "PUT",
                body: JSON.stringify(updatedGame),
                url: `/api/games/${selectedGameID}`,
                headers: { "Content-Type": "application/json" },
            }

            const sendRequest = async () => {
                const response = await fetch(request.url, {
                    method: request.method,
                    headers: request.headers,
                    body: request.body,
                });

                if (!response.ok) {
                    throw new Error('Failed to update game');
                }
            };

            if (isConnectionStable) {
                await sendRequest();
            } else {
                enqueueRequest(request);
            }

            router.back();
        } catch(e) {
            setErrorMessage("Please complete all the required fields");
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <div className={styles.inputArea}>
                        <label htmlFor="name">Name*</label>
                        <textarea
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="genre">Genre</label>
                        <textarea
                            id="genre"
                            name="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="platform">Platform</label>
                        <textarea
                            id="platform"
                            name="platform"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="backlogPriority">Backlog Priority</label>
                        <input
                            type="number"
                            id="backlogPriority"
                            name="backlogPriority"
                            value={backlogPriority}
                            onChange={(e) => setBacklogPriority(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.inputArea}>
                        <label htmlFor="hoursPlayed">Hours Played</label>
                        <input
                            type="number"
                            id="hoursPlayed"
                            name="hoursPlayed"
                            value={hoursPlayed}
                            onChange={(e) => setHoursPlayed(Number(e.target.value))}
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="timesCompleted">Times Completed</label>
                        <input
                            type="number"
                            id="timesCompleted"
                            name="timesCompleted"
                            value={timesCompleted}
                            onChange={(e) => setTimesCompleted(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="completionType">Completion Type</label>
                        <textarea
                            id="completionType"
                            name="completionType"
                            value={completionType}
                            onChange={(e) => setCompletionType(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="status">Status</label>
                        <textarea
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.inputArea}>
                        <label htmlFor="dateFirstFinished">Date First Finished</label>
                        <input
                            type="datetime-local"
                            id="dateFirstFinished"
                            name="dateFirstFinished"
                            value={dateFirstFinished}
                            onChange={(e) => setDateFirstFinished(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="rating">Rating (*/5)</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            min="0"
                            max="5"
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <button type="button"
                        className={styles.button}
                        onClick={() => {
                            router.back();
                        }}
                        style={{backgroundColor: "red"}}
                >Discard Changes</button>
                <button type="submit"
                        className={styles.button}
                        style={{backgroundColor: "orange"}}
                >Apply Changes</button>
            </div>

        </form>
    );
};
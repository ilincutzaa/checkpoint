'use client';

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import styles from "@/app/components/game-list.module.css";
import {enqueueRequest, flushQueue} from "@/app/utils/requests-queue";
import {useConnectionStable} from "@/app/hooks/connection-status";

export default function GameList() {
    const [games, setGames] = useState([]);
    const [selectedGameID, setSelectedGameID] = useState(null);

    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const [filterKey, setFilterKey] = useState("name");
    const [filterValue, setFilterValue] = useState("");

    const isConnectionStable = useConnectionStable();

    const [loading, setLoading] = useState(true);

    const [totalGames, setTotalGames] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        if (isConnectionStable) {
            flushQueue();
        }
    }, [isConnectionStable]);

    const fetchGames = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (filterValue.trim()) {
                params.set(filterKey, filterValue.trim());
            }

            params.set("sortBy", sortKey);
            params.set("order", sortOrder);
            params.set("limit", pageSize);
            params.set("offset", (page - 1) * pageSize);

            const url = `/api/games?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error("Failed to fetch games");
            const data = await response.json();
            setGames(data.games);
            setTotalGames(data.total);
        } catch (error) {
            console.error("Error fetching games:", error);
        } finally {
            setLoading(false);
        }
    }, [sortKey, sortOrder, filterKey, filterValue, page]);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    const totalPages = Math.ceil(totalGames / pageSize);

    const maxHoursPlayed = Math.max(...games.map(game => game.hoursPlayed));

    const handleDelete = async () => {
        if(!selectedGameID) return;

        const confirmed = confirm("Do you really want to delete this game?");
        if(!confirmed) return;

        const request = {
            method: "DELETE",
            url: `/api/games/${selectedGameID}`
        }

        const sendRequest = async () => {
            const response = await fetch(request.url, {
                method: request.method,
            });

            if(response.ok){
                setSelectedGameID(null);
                fetchGames();

            } else{
                const {error} = await response.json();
                alert("Delete failed: " + error);
            }
        };

        if (isConnectionStable) {
            await sendRequest();
        } else {
            enqueueRequest(request);
        }

    };

    return(
        <div className={styles.mainContainerStyle}>
            <div className={styles.buttonsContainerStyle}>
                <Link href="/add">
                    <button className={styles.button}
                        style={{
                            backgroundColor: "green",
                            cursor: "pointer",
                        }}

                    >Add Game</button>
                </Link>

                <button className={styles.button}
                    onClick={handleDelete}
                    disabled={!selectedGameID}
                    style={{
                        backgroundColor: selectedGameID ? "red" : "",
                        cursor: selectedGameID ? "pointer" : "not-allowed",
                    }}
                >
                    Delete Game
                </button>

                <Link href={`/update?id=${selectedGameID}`}>
                    <button className={styles.button}
                        disabled={!selectedGameID}
                        style={{
                            backgroundColor: selectedGameID ? "orange" : "",
                            cursor: selectedGameID ? "pointer" : "not-allowed"
                        }}
                    >Update Game</button>
                </Link>

                <Link href={`/detail?id=${selectedGameID}`}>
                    <button className={styles.button}
                            disabled={!selectedGameID}
                            style={{
                                backgroundColor: selectedGameID ? "blue" : "",
                                cursor: selectedGameID ? "pointer" : "not-allowed"
                            }}
                    >See Details</button>
                </Link>
            </div>
            <div className={styles.filterSortStyle}>
                <div className="sort-container">
                    <label>Sort By: </label>
                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="backlogPriority">Backlog Priority</option>
                        <option value="hoursPlayed">Hours Played</option>
                        <option value="rating">Rating</option>
                    </select>
                    <button className={styles.tinyButton}
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? "⬆️ Increasing" : "⬇️ Decreasing"}
                    </button>
                </div>

                <div className="filter-container">
                    <label>Filter By: </label>
                    <select value={filterKey} onChange={(e) => setFilterKey(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="genre">Genre</option>
                        <option value="platform">Platform</option>
                        <option value="backlogPriority">Backlog Priority</option>
                        <option value="hoursPlayed">Hours Played</option>
                        <option value="status">Status</option>
                        <option value="rating">Rating</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Enter filter criteria"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                    <button  className={styles.tinyButton}
                        onClick={() => setFilterValue("")}
                    >Reset</button>
                </div>
            </div>
            <div className={styles.tableStyle}>
                {loading ? (
                    <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th className={styles.thStyle}>Name</th>
                                <th className={styles.thStyle}>Genre</th>
                                <th className={styles.thStyle}>Platform</th>
                                <th className={styles.thStyle}>Backlog Priority</th>
                                <th className={styles.thStyle}>Hours Played</th>
                                <th className={styles.thStyle}>Status</th>
                                <th className={styles.thStyle}>Rating</th>

                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr className={styles.trStyle}
                                    key={game.id}
                                    onClick={() => {
                                        if(selectedGameID !== game.id)
                                            setSelectedGameID(game.id);
                                        else
                                            setSelectedGameID(null);
                                    }}
                                    style={{
                                        backgroundColor: selectedGameID === game.id ? "darkviolet" : "rgba(255, 255, 255, 0.06)",

                                    }}
                                >
                                    <td className={styles.tdStyle}>{game.name}</td>
                                    <td className={styles.tdStyle}>{game.genre}</td>
                                    <td className={styles.tdStyle}>{game.platform}</td>
                                    <td className={styles.tdStyle}>{game.backlogPriority}</td>
                                    <td className={styles.tdStyle}
                                        style={{
                                            backgroundColor: game.hoursPlayed === maxHoursPlayed ? "gold" : "transparent",
                                            fontWeight: game.hoursPlayed === maxHoursPlayed ? "bold" : "normal"
                                        }}

                                    >{game.hoursPlayed}</td>
                                    <td className={styles.tdStyle}>{game.status}</td>
                                    <td className={styles.tdStyle}>{game.rating}</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className={styles.paginationStyle}>
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={styles.paginationBtnStyle}
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className={styles.paginationBtnStyle}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

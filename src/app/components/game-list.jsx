'use client';

import {useGames} from "@/app/context/games-context";
import {useState} from "react";
import Link from "next/link";
import styles from "@/app/components/game-list.module.css";

export const GameList = () => {
    const { games, setGames } = useGames();
    const [selectedGame, setSelectedGame] = useState(null);

    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const [filterKey, setFilterKey] = useState("name");
    const [filterValue, setFilterValue] = useState("");

    const maxHoursPlayed = Math.max(...games.map(game => game.hoursPlayed));

    const sortedGames = [...games].sort((a, b) => {
        if (typeof a[sortKey] === "number" && typeof b[sortKey] === "number") {
            return sortOrder === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
        } else {
            return sortOrder === "asc"
                ? a[sortKey].localeCompare(b[sortKey])
                : b[sortKey].localeCompare(a[sortKey]);
        }
    });


    const filteredGames = sortedGames.filter((game) => {
        if(!filterValue.trim()) return true;
        const gameValue = String(game[filterKey]).toLowerCase();
        return gameValue.includes(filterValue.toLowerCase());
    })

    const handleDelete = async () => {
        if (selectedGame) {
            setGames(games.filter(game => game.id !== selectedGame));
            setSelectedGame(null);
        }
    };

    return(
        <div className="mainContainer">
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
                    disabled={!selectedGame}
                    style={{
                        backgroundColor: selectedGame ? "red" : "",
                        cursor: selectedGame ? "pointer" : "not-allowed",
                    }}
                >
                    Delete Game
                </button>

                <Link href={`/update?id=${selectedGame}`}>
                    <button className={styles.button}
                        disabled={!selectedGame}
                        style={{
                            backgroundColor: selectedGame ? "orange" : "",
                            cursor: selectedGame ? "pointer" : "not-allowed"
                        }}
                    >Update Game</button>
                </Link>

                <Link href={`/detail?id=${selectedGame}`}>
                    <button className={styles.button}
                            disabled={!selectedGame}
                            style={{
                                backgroundColor: selectedGame ? "blue" : "",
                                cursor: selectedGame ? "pointer" : "not-allowed"
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
                        {filteredGames.map((game) => (
                            <tr className={styles.trStyle}
                                key={game.id}
                                onClick={() => {
                                    if(selectedGame !== game.id)
                                        setSelectedGame(game.id);
                                    else
                                        setSelectedGame(null);
                                }}
                                style={{
                                    backgroundColor: selectedGame === game.id ? "darkviolet" : "black",

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
            </div>
        </div>
    );
};

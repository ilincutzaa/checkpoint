'use client';

import {createContext, useContext, useEffect, useState} from "react";

const GamesContext = createContext(null);

const initialGames = [
    {
        id: crypto.randomUUID(),
        name: "Dave the Diver",
        genre: "Adventure",
        platform: "PC",
        backlogPriority: 1,
        hoursPlayed: 43.5,
        timesCompleted: 0,
        completionType: "Main Story",
        status: "Not Completed",
        dateFirstFinished: new Date().toISOString().slice(0,16),
        rating: 5,
        description: "A perfect game for a cozy day...or two.. or more...",
    },
    {
        id: crypto.randomUUID(),
        name: "Mortal Kombat III",
        genre: "Fighter",
        platform: "PC",
        backlogPriority: 2,
        hoursPlayed: 100,
        timesCompleted: 1,
        completionType: "All tournaments",
        status: "Completed",
        dateFirstFinished: new Date().toISOString().slice(0,16),
        rating: 3,
        description: "Subzero ftw",
    },
];

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const storedGames = sessionStorage.getItem("games");
        if (storedGames) {
            setGames(JSON.parse(storedGames));
        } else {
            setGames(initialGames);
            sessionStorage.setItem("games", JSON.stringify(initialGames));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("games", JSON.stringify(games));
    }, [games]);

    return (
        <GamesContext.Provider value = {{games: games, setGames: setGames}}>
            {children}
        </GamesContext.Provider>
    )
};

export var useGames = () => {
    return useContext(GamesContext);
};
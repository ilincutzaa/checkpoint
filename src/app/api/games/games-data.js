const initialGames = [
    {
        id: '34',
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
        id: '35',
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

export const gamesData = {
    games: [...initialGames],

    get() {
        return this.games;
    },

    add(game) {
        this.games.push(game);
    },

    update(updatedGames) {
        this.games = updatedGames
    },
};

export default gamesData;
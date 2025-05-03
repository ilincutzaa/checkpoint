const initialGames = [
    {
        id: '1',
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
        id: '2',
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

for (let i = 3; i <= 300; i++) {
    initialGames.push({
        id: `${i}`,
        name: `Game Title ${i}`,
        genre: ["Adventure", "Shooter", "Puzzle", "Strategy", "RPG", "Fighter", "Simulation", "Platformer", "Roguelike"][i % 9],
        platform: ["PC", "PS5", "Xbox Series X", "Switch"][i % 4],
        backlogPriority: (i % 5) + 1,
        hoursPlayed: Math.floor(Math.random() * 150),
        timesCompleted: i % 3,
        completionType: ["Main Story", "Full Completion", "All Side Quests"][i % 3],
        status: i % 2 === 0 ? "Completed" : "Not Completed",
        dateFirstFinished: new Date().toISOString().slice(0, 16),
        rating: (i % 5) + 1,
        description: `An awesome experience with Game ${i}!`,
    });
}

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
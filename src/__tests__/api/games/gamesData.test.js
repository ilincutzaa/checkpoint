import { describe, test, expect, beforeEach } from 'vitest';
import { gamesData } from "@/app/api/games/games-data";

describe("gamesData", () => {
    beforeEach(() => {
        gamesData.update([
            {
                id: "1",
                name: "Test Game",
                genre: "Puzzle",
                platform: "PC",
                backlogPriority: 1,
                hoursPlayed: 10,
                timesCompleted: 0,
                completionType: "Main Story",
                status: "Not Completed",
                dateFirstFinished: new Date().toISOString().slice(0, 16),
                rating: 4,
                description: "A test game"
            }
        ]);
    });

    test("get() should return all games", () => {
        const games = gamesData.get();
        expect(games).toHaveLength(1);
        expect(games[0].name).toBe("Test Game");
    });

    test("add() should add a new game", () => {
        const newGame = {
            id: "2",
            name: "Another Game",
            genre: "RPG",
            platform: "PC",
            backlogPriority: 2,
            hoursPlayed: 20,
            timesCompleted: 1,
            completionType: "100%",
            status: "Completed",
            dateFirstFinished: new Date().toISOString().slice(0, 16),
            rating: 5,
            description: "Another test game"
        };

        gamesData.add(newGame);

        const games = gamesData.get();
        expect(games).toHaveLength(2);
        expect(games[1].name).toBe("Another Game");
    });

    test("update() should overwrite the games list", () => {
        const newList = [
            {
                id: "3",
                name: "Updated Game",
                genre: "Strategy",
                platform: "Mobile",
                backlogPriority: 3,
                hoursPlayed: 5,
                timesCompleted: 0,
                completionType: "Main Story",
                status: "In Progress",
                dateFirstFinished: new Date().toISOString().slice(0, 16),
                rating: 2,
                description: "Updated list game"
            }
        ];

        gamesData.update(newList);
        const games = gamesData.get();
        expect(games).toHaveLength(1);
        expect(games[0].name).toBe("Updated Game");
    });
});

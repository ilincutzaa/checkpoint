import { describe, test, expect, beforeEach } from 'vitest';
import { GET, POST } from "@/app/api/games/route";
import { gamesData } from "@/app/api/games/games-data";

describe("Games API Routes", () => {
    beforeEach(() => {
        gamesData.update([
            {
                id: "1",
                name: "Game 1",
                genre: "RPG",
                platform: "PC",
                backlogPriority: 2,
                hoursPlayed: 10,
                timesCompleted: 1,
                completionType: "Main Story",
                status: "Completed",
                dateFirstFinished: new Date().toISOString().slice(0, 16),
                rating: 4,
                description: "First Game"
            }
        ]);
    });

    test("GET should return current games as JSON", async () => {
        const response = await GET();
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(Array.isArray(json)).toBe(true);
        expect(json).toHaveLength(1);
        expect(json[0].name).toBe("Game 1");
    });

    test("POST should add a new game", async () => {
        const newGame = {
            id: "2",
            name: "Game 2",
            genre: "Strategy",
            platform: "Mobile",
            backlogPriority: 3,
            hoursPlayed: 5,
            timesCompleted: 0,
            completionType: "100%",
            status: "In Progress",
            dateFirstFinished: new Date().toISOString().slice(0, 16),
            rating: 5,
            description: "Second Game"
        };

        const req = new Request("http://localhost/api/games", {
            method: "POST",
            body: JSON.stringify(newGame),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await POST(req);
        expect(response.status).toBe(201);

        const games = gamesData.get();
        expect(games).toHaveLength(2);
        expect(games[1].name).toBe("Game 2");
    });

    test("POST should return 400 on invalid JSON", async () => {
        const req = new Request("http://localhost/api/games", {
            method: "POST",
            body: "{ bad json }",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await POST(req);
        expect(response.status).toBe(400);
    });
});

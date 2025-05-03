import { describe, it, expect, beforeEach } from 'vitest';
import { PATCH, DELETE, GET } from '@/app/api/games/[id]/route';
import { gamesData } from '@/app/api/games/games-data';

describe('/api/games/[id] API', () => {
    beforeEach(() => {
        gamesData.update([
            { id: '1', title: 'Game One', backlogPriority: 1 },
            { id: '2', title: 'Game Two', backlogPriority: 2 }
        ]);
    });

    describe('GET', () => {
        it('should return a game if it exists', async () => {
            const req = {};
            const params = { id: '1' };

            const res = await GET(req, { params });
            const data = await res.json();

            expect(res.status).toBe(200);
            expect(data.title).toBe('Game One');
        });

        it('should return 404 if game does not exist', async () => {
            const req = {};
            const params = { id: '999' };

            const res = await GET(req, { params });
            const data = await res.json();

            expect(res.status).toBe(404);
            expect(data.error).toBe('Game not found');
        });
    });

    describe('PATCH', () => {
        it('should update a game successfully', async () => {
            const req = {
                json: async () => ({
                    name: 'Updated Game One'
                })
            };
            const params = { id: '1' };

            const res = await PATCH(req, { params });
            const data = await res.json();

            expect(res.status).toBe(200);
            expect(data.name).toBe('Updated Game One');
        });

        it('should return 404 if game does not exist', async () => {
            const req = {
                json: async () => ({
                    title: 'Does Not Matter'
                })
            };
            const params = { id: '999' };

            const res = await PATCH(req, { params });
            const data = await res.json();

            expect(res.status).toBe(404);
            expect(data.error).toBe('Game not found');
        });

        it('should return 400 if validation fails', async () => {
            const req = {
                json: async () => ({
                    backlogPriority: 'should-be-a-number'
                })
            };
            const params = { id: '1' };

            const res = await PATCH(req, { params });
            const data = await res.json();

            expect(res.status).toBe(400);
            expect(data.error).toBeDefined();
        });
    });

    describe('DELETE', () => {
        it('should delete a game successfully', async () => {
            const req = {};
            const params = { id: '1' };

            const res = await DELETE(req, { params });

            expect(res.status).toBe(204);
            const remainingGames = gamesData.get();
            expect(remainingGames.some(game => game.id === '1')).toBe(false);
        });

        it('should return 404 if game does not exist', async () => {
            const req = {};
            const params = { id: '999' };

            const res = await DELETE(req, { params });
            const data = await res.json();

            expect(res.status).toBe(404);
            expect(data.error).toBe('Game not found');
        });
    });
});

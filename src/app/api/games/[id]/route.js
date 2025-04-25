import { NextResponse } from 'next/server';
import { gamesData } from '../games-data';
import {createGameSchema} from "@/app/schemas";

export async function PATCH(req, { params }) {
    const { id } = params;
    const body = await req.json();

    try {
        const existingGame = gamesData.get().find(g => g.id === id);
        if (!existingGame) {
            return new NextResponse(JSON.stringify({ error: "Game not found" }), { status: 404 });
        }

        const updatedFields = createGameSchema.partial().parse(body);
        const updatedGame = { ...existingGame, ...updatedFields };

        gamesData.update(gamesData.get().map(game => (game.id === id ? updatedGame : game)));

        return NextResponse.json(updatedGame, { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const gameExists = gamesData.get().some(game => game.id === id);
    if (!gameExists) {
        return new NextResponse(JSON.stringify({ error: "Game not found" }), { status: 404 });
    }

    gamesData.update(gamesData.get().filter(game => game.id !== id));
    return new NextResponse(null, { status: 204 });
}

export async function GET(req, { params }) {
    const { id } = await params;

    const gameExists = gamesData.get().some(game => game.id === id);
    if (!gameExists) {
        return new NextResponse(JSON.stringify({ error: "Game not found" }), { status: 404 });
    }
    const game = gamesData.get().find(game => game.id === id);
    return NextResponse.json(game);
}
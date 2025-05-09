import { NextResponse } from 'next/server';
import {Game, Tag} from 'models/index.js'

export async function GET(_, { params }) {
    const game = await Game.findByPk(params.id, { include: Tag });
    return game
        ? NextResponse.json(game)
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req, { params }) {
    const body = await req.json();
    const { tags = [], ...gameData } = body;

    const game = await Game.findByPk(params.id);
    if (!game) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await game.update(gameData);
    if (tags.length) {
        await game.setTags(tags);
    }

    return NextResponse.json(game);
}

export async function DELETE(_, { params }) {
    const game = await Game.findByPk(params.id);
    if (!game) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await game.destroy();
    return NextResponse.json({ message: 'Deleted' });
}

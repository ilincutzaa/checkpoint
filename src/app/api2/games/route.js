import { NextResponse } from 'next/server';
import {Game, Tag} from 'models/index.js'

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const filters = {};
    if (searchParams.has('platform')) {
        filters.platform = searchParams.get('platform');
    }
    if (searchParams.has('status')) {
        filters.status = searchParams.get('status');
    }

    const sortKey = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'desc' ? 'DESC' : 'ASC';

    const games = await Game.findAll({
        where: filters,
        include: Tag,
        order: [[sortKey, sortOrder]],
    });

    return NextResponse.json(games);
}

export async function POST(req) {
    const body = await req.json();
    const { tags = [], ...gameData } = body;

    const game = await Game.create(gameData);
    if (tags.length) {
        await game.setTags(tags); // expects array of tag IDs
    }

    return NextResponse.json(game, { status: 201 });
}

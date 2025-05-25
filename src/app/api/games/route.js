import { NextResponse } from 'next/server';
import {Game, Tag} from 'models/index.js'
import {Op, Sequelize} from 'sequelize'

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const filters = {};
    const allowedExactFilters = ['backlogPriority', 'hoursPlayed', 'rating'];
    const allowedPartialFilters = ['name', 'genre', 'platform', 'status'];
    const caseInsensitiveSortFields = ['name', 'genre', 'platform', 'status'];

    allowedExactFilters.forEach(key => {
        if (searchParams.has(key)) {
            filters[key] = searchParams.get(key);
        }
    });

    allowedPartialFilters.forEach(key => {
        if (searchParams.has(key)) {
            filters[key] = {
                [Op.iLike]: `%${searchParams.get(key)}%`,
            };
        }
    });

    const sortKey = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'desc' ? 'DESC' : 'ASC';

    const order = caseInsensitiveSortFields.includes(sortKey)
        ? [[Sequelize.fn('LOWER', Sequelize.col(`Game.${sortKey}`)), sortOrder]]
        : [[sortKey, sortOrder]];

    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const { count, rows: games } = await Game.findAndCountAll({
        where: filters,
        include: Tag,
        order,
        limit,
        offset,
    });

    return NextResponse.json({
        total: count,
        games,
    });
}

export async function POST(req) {
    const body = await req.json();
    const { tags = [], ...gameData } = body;

    const game = await Game.create(gameData);
    if (tags.length) {
        await game.setTags(tags);
    }

    return NextResponse.json(game, { status: 201 });
}

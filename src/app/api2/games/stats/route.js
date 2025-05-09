import { Game } from 'models/index.js';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const zeroHoursGames = await Game.findAll({
            where: {
                hoursPlayed: 0.0
            },
        });

        return NextResponse.json({ zeroHoursGames });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch games with 0 hours played' }, { status: 500 });
    }
}

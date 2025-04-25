import {NextResponse} from "next/server";
import {createGameSchema} from "@/app/schemas";
import {gamesData} from "@/app/api/games/games-data";


export async function GET() {
    return NextResponse.json(gamesData.get());
}

export async function POST(request) {
    try {
        const body = await request.json();
        const data = createGameSchema.parse(body);

        const newGame = {
            ...data,
            id: crypto.randomUUID()
        }

        gamesData.add(newGame);
        return NextResponse.json(newGame, {status: 201});
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, {status: 400});
    }
}
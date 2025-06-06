import { NextResponse } from 'next/server';
import {getUserFromToken} from "@/app/utils/user-token.js";
import User from "../../../../models/User.js";

export async function POST(req) {
    const user = await getUserFromToken(req)
    if (!user) {
        return NextResponse.json("Unauthorized", {status: 401})
    }

    User.update(
        {
            isTwoFactorVerified: false
        },
        {where: {id: user.id}},
    )

    const res = NextResponse.json({ message: 'Logged out successfully' });

    res.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
    });

    return res;
}

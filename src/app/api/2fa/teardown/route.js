import {getUserFromToken} from "@/app/utils/user-token.js";
import {NextResponse} from "next/server";
import User from "../../../../../models/User.js";

export async function POST(req){
    try{
        const user = await getUserFromToken(req)
        if (!user) {
            return NextResponse.json("Unauthorized", {status: 401})
        }

        User.update(
            {
                twoFactorSecret: null,
                isTwoFactorVerified: false
            },
            {where: {id: user.id}},
        )

        return NextResponse.json("2fa disabled successfully",{status: 200})
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: 'Failed to disable 2fa'}, {status: 500});
    }
}
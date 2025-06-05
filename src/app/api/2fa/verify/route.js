import {getUserFromToken} from "@/app/utils/user-token.js";
import {NextResponse} from "next/server";
import speakeasy from "speakeasy";
import User from "../../../../../models/User.js";

export async function POST(req) {
    try {
        const user = await getUserFromToken(req)
        if (!user) {
            return NextResponse.json("Unauthorized access", {status: 401})
        }

        const body = await req.json();
        const code = body.code;

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: code,
            window: 1
        })

        if (!verified) {
            return NextResponse.json({success: false, message: 'Invalid code'}, {status: 401})
        }

        await User.update(
            {isTwoFactorVerified: true},
            {where: {id: user.id}}
        )

        return NextResponse.json({success: true, message: 'Verified successfully'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to verify 2fa'}, {status: 500});
    }
}
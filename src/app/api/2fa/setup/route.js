import {getUserFromToken} from "@/app/utils/user-token.js";
import {NextResponse} from "next/server";
import speakeasy from "speakeasy";
import User from "../../../../../models/User.js";
import qrcode from "qrcode";

export async function POST(req) {
    try{
        const user = await getUserFromToken(req);
        if (!user) {
            return NextResponse.json({error: 'Unauthorized'});
        }

        const secret = speakeasy.generateSecret({
            name: `Checkpoint (${user.username})`
        })

        await User.update(
            { twoFactorSecret: secret.base32,
            isTwoFactorVerified: false},
            {where: {id: user.id}},
        )

        const otpauthURL = secret.otpauth_url
        const qrCodeImageUrl = await qrcode.toDataURL(otpauthURL);

        return NextResponse.json({qrCodeImageUrl: qrCodeImageUrl});
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: 'Failed to setup 2fa'}, {status: 500});
    }
}
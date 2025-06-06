import {jwtVerify} from "jose";
import User from "../../../../../models/User.js";
import {NextResponse} from "next/server";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
export async function POST(req){
    const {tempToken, code} = await req.json();

    try{
        const {payload} = await jwtVerify(tempToken, new TextEncoder().encode(SECRET));
        if(!payload.twoFactor || !payload.userId)
            return NextResponse.json({message:"Invalid token"}, {status: 401})

        const user = await User.findByPk(payload.userId);
        if(!user || !user.twoFactorSecret)
            return NextResponse.json({message:"User not found or 2FA not setup correctly"}, {status: 401})

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: code,
            window: 1
        })

        if(!verified)
            return NextResponse.json({message:"Invalid 2FA code"}, {status: 401})

        await User.update(
            {isTwoFactorVerified: true},
            {where: {id: user.id}}
        )

        const finalToken = jwt.sign({ userId: user.id, role: user.role, username: user.username, is2faEnabled: true}, SECRET, { expiresIn: '1h' });

        const res = NextResponse.json({
            message: 'Logged in successfully',
            role: user.role,
        });

        res.cookies.set('token', finalToken, {
            httpOnly: true,
            path: '/',
            maxAge: 3600,
            secure: true,
            sameSite: 'lax',
        })

        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

}

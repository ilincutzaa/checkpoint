import bcrypt from 'bcryptjs';
import User from 'models/User';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
    const { username, password, role } = await request.json();

    try {
        if (process.env.ALLOW_REGISTRATION !== 'true') {
            return NextResponse.json({ error: 'Registration disabled' }, { status: 403 });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword, role });

        const token = jwt.sign({ userId: user.id, role: user.role, username: user.username }, SECRET, { expiresIn: '1h' });

        const res = NextResponse.json({
            message: 'Signed up successfully',
            role: user.role,
        });

        res.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 3600,
            secure: true,
            sameSite: 'lax',
        })

        return res;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
    }
}

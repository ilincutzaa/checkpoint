import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from 'models/User';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
    const { username, password } = await request.json();

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
        }

        const token = jwt.sign({ userId: user.id, role: user.role, username: user.username, is2faEnabled: user.isTwoFactorVerified }, SECRET, { expiresIn: '1h' });


        const res = NextResponse.json({
            message: 'Logged in successfully',
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
        return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
    }
}

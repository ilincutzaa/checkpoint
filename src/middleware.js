// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/login', '/register'];

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('token')?.value;

    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        if (token) {
            try {
                await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
                // token is valid, redirect to user dashboard
                return NextResponse.redirect(new URL('/user-dashboard', req.url));
            } catch {
                // token invalid or expired, let them access login/register
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        req.user = payload;

        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/add/:path*',
        '/detail/:path*',
        '/update/:path*',
        '/admin-dashboard/:path*',
        '/user-dashboard/:path*',
        '/games/:path*',
        '/login',
        '/register'
    ],
};

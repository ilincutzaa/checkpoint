import { jwtVerify } from 'jose';

export async function GET(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return new Response(JSON.stringify({ loggedIn: true, role: payload.role }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }
}

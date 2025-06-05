import {jwtVerify} from "jose";
import User from "../../../models/User.js";

export async function getUserFromToken(req) {
    const token = req.cookies.get('token')?.value;
    if (!token) return null

    try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        const user = await User.findByPk(payload.userId)
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}
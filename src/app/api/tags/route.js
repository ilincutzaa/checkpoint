import {Tag} from "../../../../models/index.js";
import {NextResponse} from "next/server";

export async function GET(){
    const tags = await Tag.findAll()
    return NextResponse.json(tags);
}
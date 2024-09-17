import { connectMongo } from "@/libs/mongodb";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();

        const token = await getToken({ req });
        const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];

        if (!auth) {
            return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
        }

        const userId = await getTokenDetails(auth);

        const user = await Users.findById(userId); 

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log("User found:", user);

        return NextResponse.json({ message: "success", user }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "error", error: err.message }, { status: 500 });
    }
}
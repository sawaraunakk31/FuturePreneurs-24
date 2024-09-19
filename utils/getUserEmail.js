import { connectMongo } from "@/libs/mongodb";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import { getToken } from "next-auth/jwt";

export async function getUserEmail(req) {
    try {
        await connectMongo();


        const token = await getToken({ req });
        const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];

        if (!auth) {
            throw new Error("Authorization token missing");
        }

        const userId = await getTokenDetails(auth);

        const user = await Users.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user.email;
    } catch (err) {
        console.error("Error getting user email:", err);
        throw new Error(err.message);  
    }
}
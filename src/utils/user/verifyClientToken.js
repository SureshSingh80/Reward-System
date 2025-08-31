import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function verifyClientToken(token) {

    if(!token){
        return { ok: false, message: "No token" };
    }

    try {
        const decodedToken = await verifyIdToken(token);
        if (decodedToken) {
            return { ok: true, user: decodedToken };
        } else {
            return { ok: false, message: "Invalid or expired token" };
        }
    } catch (error) {
        return { ok: false, message: "Invalid or expired token" };
    }
}
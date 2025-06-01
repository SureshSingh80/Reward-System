import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request) {

    
    
    const token = request.cookies.get("token")?.value || null;
        
    if (!token) {
        return new Response(JSON.stringify({ message: "Token not found" }), {
        status: 401,
        });
    }
    
    try {
        const decodedToken = await verifyIdToken(token);
        if(decodedToken){
            console.log("Decoded token:", decodedToken);
            return new Response(JSON.stringify({ message: "Token is valid" }), {
            status: 200,
            });
        }
        else
           return new Response(JSON.stringify({ message: "Token is invalid" }), {
            status: 401,
            });
        
    } catch (error) {
        console.error("Error verifying token:", error);
        return new Response(JSON.stringify({ message: "Token is invalid" }), {
        status: 401,
        });
    }
}
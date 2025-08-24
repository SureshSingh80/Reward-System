import { verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(request) {

    
    
    const token = request.cookies.get("token")?.value || null;
    console.log("token = ", token);
        
    if (!token) {
        console.log("token not found");
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
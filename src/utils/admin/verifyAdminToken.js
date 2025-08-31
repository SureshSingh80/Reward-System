import { jwtVerify } from "jose";


export async function  verifyAdminToken (token) {
      if(!token){
        return {ok:false, message:"no token"};
      }
      try {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jwtVerify(token, secret);
      
          if (payload.role !== "admin") {
            return { ok: false, message: "not admin" };
          }
          return { ok: true, user: payload };
        } catch (err) {
          return { ok: false, message: "Invalid or expired token" };
        }
}
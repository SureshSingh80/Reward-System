import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {auth} from "@/lib/firebaseConfig";

export const signUp= (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);

}
export const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
}
export const logOut=()=>{
    return signOut(auth);
}
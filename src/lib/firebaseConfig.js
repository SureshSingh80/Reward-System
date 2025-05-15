import { initializeApp,getApps } from "firebase/app";

import {getAuth} from "firebase/auth";

// basic firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  console.log("firebaseConfig initilized app is",getApps().length);
  console.log("api key=: ",process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
// Initialize Firebase Authentication and get a reference to the service
   
  export const auth = getAuth(app);

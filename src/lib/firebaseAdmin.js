import admin from 'firebase-admin';


const adminConfig = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

console.log("Admin config= ",adminConfig);


if (!adminConfig) {
  throw new Error('Firebase Admin SDK credentials not found in environment variables');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
}


export const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded token in firebaseAdmin=",decodedToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return  null;
  }
}

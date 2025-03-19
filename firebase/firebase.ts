import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PLASMO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.PLASMO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredFields = ["apiKey", "authDomain", "projectId", "appId"];
const isConfigValid = requiredFields.every(
    (field) => firebaseConfig[field as keyof typeof firebaseConfig]
);

if (!isConfigValid) {
    throw new Error("Missing required Firebase configuration fields");
}

let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Failed to initialize Firebase:", error);
    throw error;
}

export const auth = getAuth(app);
export { app };
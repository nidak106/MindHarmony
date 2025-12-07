// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Validate Vite env vars early so the error is obvious in production builds
const env = import.meta.env;
const required = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const missing = required.filter((k) => !env[k] && env[k] !== "");
export const firebaseInitError = missing.length
  ? `Missing Firebase environment variables at build time: ${missing.join(
      ", "
    )}. Ensure VITE_FIREBASE_* vars are set in your hosting provider and rebuild.`
  : null;

if (firebaseInitError) {
  // keep a clear console message for debugging
  console.error(firebaseInitError);
}

// only create config if all required env vars are present
const firebaseConfig = firebaseInitError
  ? null
  : {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
    };

// Initialize Firebase only when config is present
let auth = null;
let googleProvider = null;

if (firebaseConfig) {
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export { auth, googleProvider };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: "estlmarketproject.firebaseapp.com",
  projectId: "estlmarketproject",
  storageBucket: "estlmarketproject.appspot.com",
  messagingSenderId: "129090735618",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: "G-RPEXVFPBRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
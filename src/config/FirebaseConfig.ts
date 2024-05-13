// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKW-ll8VX4gSblE0p22EaT6wqvnBGQJCU",
  authDomain: "estlmarketproject.firebaseapp.com",
  projectId: "estlmarketproject",
  storageBucket: "estlmarketproject.appspot.com",
  messagingSenderId: "129090735618",
  appId: "1:129090735618:web:f975e9fb6dac3a093ee11b",
  measurementId: "G-RPEXVFPBRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
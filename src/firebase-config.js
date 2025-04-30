import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4uDWZMRocuFUmIV0ZyYw4lf2WeNvg4fo",
  authDomain: "inventorybilling-app.firebaseapp.com",
  projectId: "inventorybilling-app",
  storageBucket: "inventorybilling-app.firebasestorage.app",
  messagingSenderId: "1013823675664",
  appId: "1:1013823675664:web:53f1190019ca2beb8c5995"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Firebase services for use
export const auth = getAuth(app);
export const db = getFirestore(app);
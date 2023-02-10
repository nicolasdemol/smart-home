// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbiyHR0lzxP1llC-0JREW_KYEweGUE1S4",
  authDomain: "smart-e6729.firebaseapp.com",
  projectId: "smart-e6729",
  storageBucket: "smart-e6729.appspot.com",
  messagingSenderId: "771613888601",
  appId: "1:771613888601:web:8ebb04d9f36496071fa148",
  measurementId: "G-8PW2G2GBJY"
};

const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { db };
export { auth };
export default app;

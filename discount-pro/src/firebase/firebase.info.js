// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9J4A7ghdjcJh-GPFbcEWk2E7D06Q7Ml0",
  authDomain: "discount-pro-73bfc.firebaseapp.com",
  projectId: "discount-pro-73bfc",
  storageBucket: "discount-pro-73bfc.firebasestorage.app",
  messagingSenderId: "1002881834750",
  appId: "1:1002881834750:web:16d0cc5f0f09dfe71b0faf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;

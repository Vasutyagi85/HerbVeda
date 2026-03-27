// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 👇 PASTE YOUR COPIED CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyCLl3IwWEi_qoJ0v-YsKHw8BFMiEBc0gnQ",
  authDomain: "herbveda-45f82.firebaseapp.com",
  projectId: "herbveda-45f82",
  storageBucket: "herbveda-45f82.firebasestorage.app",
  messagingSenderId: "148037657992",
  appId: "1:148037657992:web:39e3d079f079aae402c63d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
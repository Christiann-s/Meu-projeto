#.env

# Variáveis do Firebase para React
# O prefixo REACT_APP_ é crucial para que o React as reconheça
REACT_APP_FIREBASE_API_KEY = "AIzaSy..."
REACT_APP_FIREBASE_AUTH_DOMAIN = "seu-projeto.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID = "seu-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET = "seu-projeto.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "1234567890"
REACT_APP_FIREBASE_APP_ID = "1:1234567890:web:abcdef123456"
// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Acessando as variáveis usando process.env
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // utils/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Acessando as variáveis usando process.env. Isso está perfeito.
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
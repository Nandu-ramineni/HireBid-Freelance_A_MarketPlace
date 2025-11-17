
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBVJAkn8H1iZWLUaaLkOXTaRcOxPLIuTao",
    authDomain: "freelance-ccb80.firebaseapp.com",
    projectId: "freelance-ccb80",
    storageBucket: "freelance-ccb80.appspot.com",
    messagingSenderId: "222610329903",
    appId: "1:222610329903:web:58e9852b0c27ec07b2d1da",
    measurementId: "G-072115QN44"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };

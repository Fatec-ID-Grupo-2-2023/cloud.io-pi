import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApWKH5LH8FD5Y7DP4_5COYy46v96PAJIE",
    authDomain: "cloudio-382200.firebaseapp.com",
    projectId: "cloudio-382200",
    storageBucket: "cloudio-382200.appspot.com",
    messagingSenderId: "840694087672",
    appId: "1:840694087672:web:af7e590747acee1459600d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
// importamos para authentication
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-FtkxPituNYHJSt_Y0MMDJC-qX4KmWH0",
  authDomain: "adminbasic-bc810.firebaseapp.com",
  projectId: "adminbasic-bc810",
  storageBucket: "adminbasic-bc810.appspot.com",
  messagingSenderId: "487019263541",
  appId: "1:487019263541:web:d8605d5312dbe37805a37c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// obtenemos la referencia getAutht
export const auth = getAuth(app);

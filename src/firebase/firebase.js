// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO: use env.local for this
// TODO find a way to run this always
const firebaseConfig = {

  apiKey: "AIzaSyCXFbLcLhHaIQ36xtN8Ty_z0y6uV54AOao",

  authDomain: "lazy-companion.firebaseapp.com",

  projectId: "lazy-companion",

  storageBucket: "lazy-companion.appspot.com",

  messagingSenderId: "897226292491",

  appId: "1:897226292491:web:c246b52e2b413ef07b760e",

  measurementId: "G-3PMMVLY3NJ"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;
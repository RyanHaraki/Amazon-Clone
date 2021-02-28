import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAn-rk0s18wIMDOhOSTD6MAQ390p0rwM4s",
  authDomain: "project-8784245491664764124.firebaseapp.com",
  databaseURL: "https://project-8784245491664764124.firebaseio.com",
  projectId: "project-8784245491664764124",
  storageBucket: "project-8784245491664764124.appspot.com",
  messagingSenderId: "932123005433",
  appId: "1:932123005433:web:4eea6fd900c9b9f3556d28",
};

//initialize app
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

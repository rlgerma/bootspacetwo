import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "bootspacetwo",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.RECT_APP_MESSUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const gitHubProvider = new firebase.auth.GithubAuthProvider();
export const perf = firebase.performance();

export const token = JSON.parse(sessionStorage.getItem("githubToken"));

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/performance";

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

firebase
  .firestore()
  .enablePersistence()
  .catch((error) =>
    error.code === "failed-precondition"
      ? console.warn(
          "Persistence enabled for single tab use. To enable persistence please close all but one tab for this application."
        )
      : error.code === "unimplemented"
      ? console.warn(
          "The current browser does not support all of the features required to enable persistence"
        )
      : console.warn(error.message)
  );
export const auth = firebase.auth();
export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const gitHubProvider = new firebase.auth.GithubAuthProvider();
export const perf = firebase.performance();
export const statePersistence = firebase.auth;

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGCSr8j-FgTP6jmHEIoYtddQC4zg5F_4s",
  authDomain: "bootspace-6a443.firebaseapp.com",
  databaseURL: "https://bootspace-6a443.firebaseio.com",
  projectId: "bootspace-6a443",
  storageBucket: "bootspace-6a443.appspot.com",
  messagingSenderId: "654838828145",
  appId: "1:654838828145:web:7f2ad8655473e135a0dfd0",
  measurementId: "G-VW08PGN0M4",
};

const provider = new firebase.auth.GithubAuthProvider();

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGithub = () => {
  auth.signInWithPopup(provider);
};

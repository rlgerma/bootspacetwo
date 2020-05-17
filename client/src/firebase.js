import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GithubAuthProvider();
export const signInWithGithub = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL, metadata } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        metadata,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

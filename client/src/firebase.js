import firebase from "firebase/app";
// eslint-disable-next-line
import dotenv from "dotenv";
import { navigate } from "@reach/router";
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
firebase.firestore().settings({ experimentalForceLongPolling: true });
export const perf = firebase.performance();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GithubAuthProvider();
export const signInWithGithub = () => {
  auth.signInWithPopup(provider).then(function(result) {
    var userData = {
      login: result.additionalUserInfo.profile.login,
      bio: result.additionalUserInfo.profile.bio,
      repos: result.additionalUserInfo.profile.public_repos,
      reposUrl: result.additionalUserInfo.profile.repos_url,
      followers: result.additionalUserInfo.profile.followers,
      followersUrl: result.additionalUserInfo.profile.followers_url,
      following: result.additionalUserInfo.profile.following,
      location: result.additionalUserInfo.profile.location,
      profileUrl: result.additionalUserInfo.profile.html_url,
      blog: result.additionalUserInfo.profile.blog,
      name: result.additionalUserInfo.profile.name,
      gists: result.additionalUserInfo.profile.gists_url,
      createdAt: result.additionalUserInfo.profile.created_at,
      company: result.additionalUserInfo.profile.company,
      hireable: result.additionalUserInfo.profile.hireable,
      lastUpdate: result.additionalUserInfo.profile.updated_at,
    };
    console.log(result.additionalUserInfo);
    localStorage.setItem("bootSpaceUser", JSON.stringify(userData));
    navigate("/home");
  });
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    const userData = JSON.parse(localStorage.getItem("bootSpaceUser"));

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        userData,
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

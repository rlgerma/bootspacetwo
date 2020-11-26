import firebase from "firebase/app";
// eslint-disable-next-line

import { navigate } from "@reach/router";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/database";
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
export const database = firebase.database();
export const userData = JSON.parse(sessionStorage.getItem("bootSpaceUser"));
export const token = JSON.parse(sessionStorage.getItem("githubToken"));
export const feedData = JSON.parse(sessionStorage.getItem("feed"));
export const friendData = JSON.parse(sessionStorage.getItem("friends"));
const provider = new firebase.auth.GithubAuthProvider();

const getNewsFeed = () => {
  const postsRef = database.ref("feed/posts");
  postsRef.once("value").then((snapshot) => {
    let arr = [];
    snapshot.forEach((childSnapshot) => {
      let post = childSnapshot.toJSON();
      arr.push(post);
    });
    sessionStorage.setItem("feed", JSON.stringify(arr));
  });
};

export const signInWithGithub = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      let user = result.additionalUserInfo.profile;
      let userData = {
        avatar_url: user.avatar_url,
        login: user.login,
        bio: user.bio,
        repos: user.public_repos,
        reposUrl: user.repos_url,
        followers: user.followers,
        followersUrl: user.followers_url,
        following: user.following,
        location: user.location,
        profileUrl: user.html_url,
        blog: user.blog,
        name: user.name,
        gists: user.gists_url,
        createdAt: user.created_at,
        company: user.company,
        hireable: user.hireable,
        lastUpdate: user.updated_at,
        storage: user.disk_usage,
      };
      sessionStorage.setItem("githubToken", JSON.stringify(token));
      sessionStorage.setItem("bootSpaceUser", JSON.stringify(userData));
      getNewsFeed();
    })
    .catch((error) => {
      console.error(error.message);
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
      ...navigate("/"),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

import firebase from "firebase/app";
import { navigate } from "@reach/router";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1PO7YYmlrQwMYWcqBfUHoG_YaS4E8Oho",
  authDomain: "bootspacetwo.firebaseapp.com",
  databaseURL: "https://bootspacetwo.firebaseio.com",
  projectId: "bootspacetwo",
  storageBucket: "bootspacetwo.appspot.com",
  messagingSenderId: "603883173363",
  appId: "1:603883173363:web:421518b00f1af92ff1ce86",
  measurementId: "G-XVN7LR9ZBJ",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
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

    localStorage.setItem("bootSpaceUser", JSON.stringify(userData));

    window.location.reload();
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

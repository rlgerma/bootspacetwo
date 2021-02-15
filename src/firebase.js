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
export const storage = firebase.storage();

export const userData = JSON.parse(sessionStorage.getItem("bootSpaceUser"));
export const token = JSON.parse(sessionStorage.getItem("githubToken"));
export const feedData = JSON.parse(sessionStorage.getItem("feed"));
export const friendData = JSON.parse(sessionStorage.getItem("friends"));

export const signInWithGithub = async () => {
  await auth
    .signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken;
      let user = result.additionalUserInfo.profile;

      sessionStorage.setItem("githubToken", JSON.stringify(token));
      sessionStorage.setItem("bootSpaceUser", JSON.stringify(user));
    })
    .catch((error) => {
      console.error(error.message);
    });
  return;
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
  navigate("/");
};

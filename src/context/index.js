import React, { useEffect, useState, createContext } from "react";
import { db, auth, firestore } from "../firebase";
import { useDispatch } from "react-redux";

import { SET_USER, SET_POSTS } from "../redux/actions/";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [authUser, setAuthUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      const wait = setTimeout(() => {
        setPending(false);
      }, 2000);

      return () => clearTimeout(wait);
    });
  }, []);

  const generateUserDocument = async (res) => {
    try {
      const { uid } = res.user;

      const userRef = db.doc(`users/${uid}`);
      const snapshot = await userRef.get();

      if (!snapshot.exists) {
        const { email, displayName } = res.user;
        const firstName = displayName.split(" ").slice(0, -1).join(" ");
        const lastName = displayName.split(" ").slice(-1).join(" ");
        try {
          await userRef
            .set(
              {
                active: true,
                createdOn: firestore.FieldValue.serverTimestamp(),
                email,
                firstName,
                lastName,
                profilePic: res.additionalUserInfo.profile.avatar_url,
                ...res.additionalUserInfo.profile,
                token: res.credential.accessToken,
              },
              { merge: true }
            )
            .then(() => functions.getUserDocument(uid));
        } catch (error) {
          console.error("Error creating user document", error);
        }
      } else if (snapshot.exists) {
        await userRef
          .set(
            {
              profilePic: res.additionalUserInfo.profile.avatar_url,
              ...res.additionalUserInfo.profile,
              token: res.credential.accessToken,
            },
            { merge: true }
          )
          .then(() => functions.getUserDocument(uid));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserDocument = (uid) => {
    const userRef = db.doc(`users/${uid}`);

    if (!uid) return null;

    userRef.onSnapshot((snap) => {
      dispatch({
        type: SET_USER,
        payload: snap.data(),
      });
    });
  };
  const getPosts = async (arr) => {
    try {
      const postsRef = await db.collection("feed").get();

      for await (let post of postsRef.docs) {
        arr.push(post.data());
      }

      return dispatch({
        type: SET_POSTS,
        payload: arr,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const functions = {
    generateUserDocument,
    getUserDocument,
    getPosts,
  };

  if (pending) {
    return <p>Loading</p>;
  } else {
    return (
      <UserContext.Provider
        value={{
          authUser,
          functions,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
};

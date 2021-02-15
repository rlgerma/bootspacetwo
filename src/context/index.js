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
      setTimeout(() => {
        setPending(false);
      }, 2000);

      return () => clearTimeout();
    });
  }, []);

  const generateUserDocument = async (user) => {
    const { uid } = user;

    const userRef = db.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { email, displayName } = user;
      const firstName = displayName.split(" ").slice(0, -1).join(" ");
      const lastName = displayName.split(" ").slice(-1).join(" ");
      try {
        await userRef.set(
          {
            active: true,
            createdOn: firestore.FieldValue.serverTimestamp(),
            email,
            firstName,
            lastName,
            profilePic: null,
          },
          { merge: true }
        );

        return functions.getUserDocument(user.uid);
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else if (snapshot.exists) {
      return functions.getUserDocument(user.uid);
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

  let functions = {
    generateUserDocument,
    getUserDocument,
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

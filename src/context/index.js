import React, { useEffect, useState, createContext } from "react";
import { auth, firestore } from "../firebase";
import { useDispatch } from "react-redux";

import { SET_USER } from "../redux/actions/";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [authUser, setAuthUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setTimeout(() => {
        setPending(false);
      }, 2000);

      return () => clearTimeout();
    });
  }, []);

  const generateUserDocument = async (user, userInfo) => {
    if (!user) return;

    const { uid } = user;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    const { email, displayName } = user;

    if (!snapshot.exists) {
      const { email } = user;
      const firstName = user.displayName.split(" ").slice(0, -1).join(" ");
      const lastName = user.displayName.split(" ").slice(-1).join(" ");
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
};

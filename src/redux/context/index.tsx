import { useEffect, useState, createContext, FC } from "react";
import { db, auth, firestore } from "../../firebase";
import { useDispatch } from "react-redux";

import { Actions } from "../actions";
import firebase from "firebase/compat";
import { GitHubUser } from "../../../typings";
import { Col, Row, Spin } from "antd";

type User = firebase.User;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContext = createContext<any | null>(null);

export const UserProvider: FC = ({ children }) => {
  const dispatch = useDispatch();

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setAuthUser(user);
      const wait = setTimeout(() => setPending(false), 400);
      return () => clearTimeout(wait);
    });
  }, []);

  async function generateUserDocument(res: GitHubUser) {
    try {
      const { uid } = res.user;

      if (!uid) throw new Error("No user id found");

      const userRef = db.doc(`users/${uid}`);
      const snapshot = await userRef.get();

      if (!snapshot.exists) {
        const { email, displayName } = res.user;
        const firstName = displayName?.split(" ").slice(0, -1).join(" ") ?? "";
        const lastName = displayName?.split(" ").slice(-1).join(" ") ?? "";

        return userRef
          .set(
            {
              active: true,
              createdOn: firestore.FieldValue.serverTimestamp(),
              email,
              firstName,
              lastName,
              pictureUrl: res.additionalUserInfo.profile.avatar_url,
              token: res.credential.accessToken,
              ghMeta: {
                ...res.additionalUserInfo.profile,
              },
            },
            { merge: true }
          )
          .then(() => functions.getUserDocument(uid));
      } else {
        return userRef
          .set(
            {
              pictureUrl: res.additionalUserInfo.profile.avatar_url,
              token: res.credential.accessToken,
              ghMeta: {
                ...res.additionalUserInfo.profile,
              },
            },
            { merge: true }
          )
          .then(() => functions.getUserDocument(uid));
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const getUserDocument = async (uid: string) => {
    try {
      if (!uid) throw new Error("No user id found");

      const userRef = await db.doc(`users/${uid}`).get();

      if (!userRef.exists) throw new Error("User does not exist");
      else {
        return dispatch({
          type: Actions.SET_USER,
          payload: userRef.data(),
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Actions.SET_USER,
        payload: {},
      });
      return false;
    }
  };

  async function getPosts(arr: { data: firebase.firestore.DocumentData; id: string }[]) {
    try {
      const postsRef = await db.collection("feed").get();

      for await (const post of postsRef.docs) {
        arr.push({ data: post.data(), id: post.ref.id });
      }

      return dispatch({
        type: Actions.SET_POSTS,
        payload: arr,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Actions.SET_POSTS,
        payload: arr,
      });
      return false;
    }
  }

  const functions = {
    generateUserDocument,
    getUserDocument,
    getPosts,
  };

  if (pending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row style={{ margin: "15% auto" }}>
          <Col>
            <div>
              <Spin size='large' />
            </div>
          </Col>
        </Row>
      </div>
    );
  } else
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
};

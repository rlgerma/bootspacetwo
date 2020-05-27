import React, { useState } from "react";
import { signInWithGithub } from "../firebase";
import { auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <div className="row">
        {error !== null && <div className="error">{error}</div>}

        <button
          onClick={() => {
            try {
              signInWithGithub();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="githubLogin"
        >
          Sign In with GitHub
        </button>
      </div>
    </div>
  );
};
export default SignIn;

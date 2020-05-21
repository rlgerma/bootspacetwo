import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGithub, generateUserDocument } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="container">
      <h2>Sign Up</h2>
      <div className="row">
        {error !== null && <div className="error">{error}</div>}
        <form className="">
          <label htmlFor="displayName" className="loginLabel">
            GitHub Username:
          </label>
          <input
            type="text"
            className="loginInput"
            name="displayName"
            value={displayName}
            placeholder="E.g: devdude314"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="loginLabel">
            Email:
          </label>
          <input
            type="email"
            className="loginInput"
            name="userEmail"
            value={email}
            placeholder="E.g: larry@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="loginLabel">
            Password:
          </label>
          <input
            type="password"
            className="loginInput"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            className="loginButton"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p>or</p>
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
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="loginLink">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;

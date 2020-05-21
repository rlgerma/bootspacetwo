import React, { useState } from "react";
import { Link } from "@reach/router";
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
        <form className="">
          <label htmlFor="userEmail" className="loginLabel">
            Email:
          </label>
          <input
            type="email"
            className="loginInput"
            name="userEmail"
            value={email}
            placeholder="E.g: sergey@gmail.com"
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
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
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
          Don't have an account?{" "}
          <Link to="/signUp" className="loginLink">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="/passwordReset" className="loginLink">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;

import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGithub } from "../utils/firebase";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
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
    <div className="mt-8">
      <h1 className="text-center bold">Sign Up with GitHub!</h1>

      <button className="red center" onClick={signInWithGithub}>
        Sign In with GitHub
      </button>
      <p className="text-center my-3">
        Already have an account?{" "}
        <Link to="/" className="blue">
          Sign in here
        </Link>
      </p>
    </div>
  );
};
export default SignUp;

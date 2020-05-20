import React from "react";
import { Link } from "@reach/router";
import { auth, signInWithGithub, generateUserDocument } from "../firebase";

const SignIn = () => {
  return (
    <div className="mt-8">
      <h1 className="text-center bold">Sign Up with GitHub!</h1>

      <button
        className="red center"
        onClick={() => {
          try {
            signInWithGithub();
          } catch (error) {
            console.error("Error signing in with Google", error);
          }
        }}
      >
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
export default SignIn;

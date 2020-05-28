import React, { useState } from "react";
import { signInWithGithub } from "../firebase";

const SignIn = () => {
  const [error] = useState(null);

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

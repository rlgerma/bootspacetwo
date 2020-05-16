import React, { useState } from "react";

const SignIn = () => {
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}

        <p className="text-center my-3">or</p>
        <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link
            to="passwordReset"
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;

import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import UseHome from "./UseHome";
import UseNav from "../components/UseNav";
import NavBar from "../components/NavBar";
import Profile from "./Profile";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PasswordReset from "../components/PasswordReset";
import "../styles/bootspace.css";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <>
      <UseNav />
      <Router>
        <UseHome path="/home" />
        <Profile path="/profile" />
      </Router>
    </>
  ) : (
    <>
      <NavBar />
      <Router>
        <Home path="/" />
        <SignUp path="/signUp" />
        <SignIn path="/signin" />

        <PasswordReset path="/passwordReset" />
      </Router>
    </>
  );
}

export default Application;

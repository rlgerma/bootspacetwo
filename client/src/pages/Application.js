import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import UseHome from "./UseHome";
import Profile from "./Profile";
import News from "./News";
import Music from "./Music";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PasswordReset from "../components/PasswordReset";

import "../styles/bootspace.css";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <Router>
      <UseHome path="/home" />
      <Profile path="/profile" />
      <News path="/news" />
      <Music path="/music" />
    </Router>
  ) : (
    <Router>
      <Home path="/" />
      <SignIn path="/signin" />
      <SignUp path="/signUp" />
      <PasswordReset path="/passwordreset" />
    </Router>
  );
}

export default Application;

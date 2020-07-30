import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import Blog from "./Blog";
import UserHome from "./User/UserHome";
import UseNav from "../components/user/layout/UseNav";
import NavBar from "../components/layout/NavBar";
import Profile from "./User/Profile";
import SignIn from "../components/user/auth/SignIn";
import SideNav from "../components/layout/SideNav";
function Application() {
  const user = useContext(UserContext);
  return user ? (
    <>
      <UseNav />
      <Router>
        <UserHome path="/" />
        <Profile path="/profile" />
        <Blog path="/blog" />
      </Router>
    </>
  ) : (
    <>
      <NavBar />
      <Router>
        <Home path="/" />
        <SignIn path="/signin" />
        <Blog path="/blog" />
      </Router>
    </>
  );
}

export default Application;

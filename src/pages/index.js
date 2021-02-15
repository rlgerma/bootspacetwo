import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import Blog from "./Blog";
import UserHome from "./User/UserHome";
import NavBar from "../components/layout/NavBar";
import Profile from "./User/Profile";
import SignIn from "../components/user/auth/SignIn";

const Application = () => {
  const user = useContext(UserContext);
  return (
    <>
      <NavBar user={user} />
      <Router>
        {user !== null ? (
          <>
            <UserHome user={user} path='/' />
            <Profile user={user} path='/profile' />
          </>
        ) : (
          <>
            <Home path='/' />
            <SignIn user={user} path='/signin' />
          </>
        )}
        <Blog path='/blog' />
      </Router>
    </>
  );
};

export default Application;

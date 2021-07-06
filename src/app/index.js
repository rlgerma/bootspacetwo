import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "../context";
import { useSelector } from "react-redux";
import ProtectedRoute from "../protected";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import UserHome from "../pages/User/UserHome";
import Profile from "../pages/User/Profile";
import NavBar from "../components/layout/NavBar";
import Login from "../components/user/auth/SignIn";

const App = () => {
  const { authUser, functions } = useContext(UserContext);
  const user = useSelector((state) => state.user);
  let uid;

  if (authUser) {
    uid = authUser.uid;
  }

  useEffect(() => {
    if (!user) {
      functions.getUserDocument(uid);
    }
  }, [functions, uid, user]);
  return (
    <>
      <Router>
        <NavBar />
        <ProtectedRoute component={UserHome} path='/' />
        <ProtectedRoute component={Profile} path='/profile' />
        <Route component={Home} path='/' />
        <Route component={Login} path='/login' />
        <Route component={Blog} path='/blog' />
      </Router>
    </>
  );
};

export default App;

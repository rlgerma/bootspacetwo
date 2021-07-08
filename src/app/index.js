import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "../protected";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile/";
import NavBar from "../components/layout/NavBar";
import Login from "../components/auth/SignIn";

const App = () => (
  <Router>
    <Route component={NavBar} path='/' />
    <Route component={Home} exact path='/' />
    <Route component={Login} exact path='/login' />
    <Route component={Blog} exact path='/blog' />
    <ProtectedRoute component={Profile} exact path='/profile' />
  </Router>
);

export default App;

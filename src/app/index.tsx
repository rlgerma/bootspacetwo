import { FC, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile";

import NavBar from "../components/layout/NavBar";
import Login from "../components/auth/SignIn";

import { UserContext } from "../redux/context";
import UserHome from "../pages/Home/UserHome";

const App: FC = () => {
  const { authUser } = useContext(UserContext);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route element={authUser ? <UserHome /> : <Home />} path='/' />
        <Route element={<Profile />} path='/profile' />
        <Route element={<Login />} path='/login' />
        <Route element={<Blog />} path='/blog' />
      </Routes>
    </Router>
  );
};

export default App;

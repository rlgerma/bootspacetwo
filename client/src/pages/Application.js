import React, { useContext } from "react";
import { Router } from "@reach/router";
import { Container } from "reactstrap";
import { UserContext } from "../providers/UserProvider";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import News from "./News";
import Music from "./Music";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/bootspace.css";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <Profile />
  ) : (
    <Container>
      <NavBar />
      <Router>
        <Home path="/" />
        <News path="/news" />
        <Profile path="/profile" />
        <Music path="/music" />
        <SignIn path="/login" />
      </Router>
      <Footer />
    </Container>
  );
}

export default Application;

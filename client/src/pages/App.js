import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn"
import News from "./News";
import Music from "./Music";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/bootspace.css";

function App() {
  const user = null;

  return user ? (
    <Profile />
  ) : (
    <Router>
      <Container>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path={["/profile"]} component={Profile} />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/login" component={SignIn} />
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;

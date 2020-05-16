import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./Home";
import Profile from "./Profile";
import News from "./News";
import Music from "./Music";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/bootspace.css";

function App() {
  return (
    <Router>
      <div id="App">
        <Container>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              exact
              path={["/profile", "/users/:id", "/aboutme"]}
              component={Profile}
            />
            <Route path="/news" component={News} />
            <Route path="/music" exact component={Music} />
          </Switch>
          <Footer />
        </Container>
      </div>
    </Router>
  );
}

export default App;

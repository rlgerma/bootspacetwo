import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./Home";
import Profile from "./Profile";
import News from "./News";
import Music from "./Music";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";
import "../styles/bootspace.css";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDGCSr8j-FgTP6jmHEIoYtddQC4zg5F_4s",
    authDomain: "bootspace-6a443.firebaseapp.com",
    databaseURL: "https://bootspace-6a443.firebaseio.com",
    projectId: "bootspace-6a443",
    storageBucket: "bootspace-6a443.appspot.com",
    messagingSenderId: "654838828145",
    appId: "1:654838828145:web:7f2ad8655473e135a0dfd0",
    measurementId: "G-VW08PGN0M4",
  };

  firebase.initializeApp(firebaseConfig);
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

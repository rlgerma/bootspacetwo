import React, { Fragment } from "react";

const h1 = {
  color: "#155abb",
  fontFamily: "'Helvetica Neue', sans-serif",
  fontSize: "36px",
  fontWeight: "bold",
  letterSpacing: "-1px",
  lineHeight: "1",
  textAlign: "center",
};

const d = {
  background: "#155abb",
  backgroundImage: "linear-gradient(#155abb, #ffce95)",
  padding: "12px",
  marginLeft: "15px",
  marginRight: "15px",
};

const d2 = {
  borderRadius: "32px",
  padding: "40px",
  background: "white",
};

const Home = () => (
  <Fragment>
    <div style={d}>
      <div style={d2}>
        <h1 style={h1}>Welcome to BootSpace!</h1>
      </div>
    </div>
  </Fragment>
);

export default Home;

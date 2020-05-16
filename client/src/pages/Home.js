// This will be the home page that the log out button will return to.
//This will have developer news stream so will need an API
// Can use hacker news: https://rapidapi.com/community/api/hacker-news

import React, { Fragment } from 'react';

const h1 = { "color": "#155abb", "fontFamily": "'Helvetica Neue', sans-serif", "fontSize": "36px", "fontWeight": "bold", "letterSpacing": "-1px", "lineHeight": "1", "textAlign": "center" };

const h2 = { "color": "#fe921b", "fontFamily": "'Helvetica Neue', sans-serif", "fontSize": "30px", "fontWeight": "bold", "letterSpacing": "-1px", "lineHeight": "1", "textAlign": "center" };

const h3 = { "color": "#155abb", "fontFamily": "'Helvetica Neue', sans-serif", "fontSize": "24px", "fontWeight": "bold", "letterSpacing": "-1px", "lineHeight": "1", "textAlign": "center" };

const p = { "color": "#111", "fontFamily": "'Open Sans', sans-serif", "fontSize": "16px", "fontWeight": "300", "lineHeight": "32px", "margin": "0 0 72px", "textAlign": "center", "paddingLeft": "20%", "paddingRight": "20%" };

const d = {
  background: "#155abb",
  backgroundImage: "linear-gradient(#155abb, #ffce95)",
  padding: "12px",
  marginLeft: "15px",
  marginRight: "15px"
}

const d2 = {
  borderRadius: "32px",
  padding: "40px",
  background: "white"
}

const fz = {
  color: "#fe921b",
  fontStyle: "italic"
}

const Home = () => (
  <Fragment>
    <div style={d}>
      <div style={d2}>
        <h1 style={h1}>Bootspace brings colleagues together...</h1>
        <h1 style={h2}><em>...wherever they are</em></h1>
        <p style={p}>With all of the recruiter spam on social networking sites like LinkedIn, isn't it time for something better? At Bootspace, people you <em>care</em> about stay engaged no matter where you're posting from - while other's <em>won't</em>.</p>
        <h2 style={h3}>Forge meaningful connections</h2>
        <p style={p}>Making friends on Bootspace gives everyone in your bootcamp a shared sense of purpose. Networking early pays off!</p>
        <h2 style={h3}>Relationships, organized</h2>
        <p style={p}>
          Instead of adding to your overstuffed email inbox, conversations in Bootspace happen in dedicated spaces called <span style={fz}>friend-zones</span>.
      </p>
        <h2 style={h3}>Get looped in, not out</h2>
        <p style={p}>Bootspace makes it simple to follow conversations or find important information in an easily searchable archive.</p>
        <h2 style={h3}>Give casual business networking a chance</h2>
        <p style={p}>
          Unlike other social networking sites, Bootspace lets you be yourself while at the same time showcasing your professional chops.
    </p>
      </div>
    </div>
  </Fragment>
);

export default Home;

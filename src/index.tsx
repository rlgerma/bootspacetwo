import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import { Provider as StateProvider } from "react-redux";
import { UserProvider } from "./context";

import store from "./redux/store";
import "./styles/main.less";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

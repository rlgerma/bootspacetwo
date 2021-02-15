import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import * as serviceWorker from "./serviceWorker";

import { Provider as StateProvider } from "react-redux";
import { UserProvider } from "./context";

import store from "./redux/store";

ReactDOM.render(
  <StateProvider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.register();

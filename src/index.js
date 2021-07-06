import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import * as serviceWorker from "./serviceWorker";

import { Provider as StateProvider } from "react-redux";
import { UserProvider } from "./context";

import store from "./redux/store";
import { Layout } from "antd";
import "./styles/App.scss";
ReactDOM.render(
  <StateProvider store={store}>
    <UserProvider>
      <Layout className='layout'>
        <Layout.Content style={{ paddingBottom: "2.5rem" }}>
          <App />
        </Layout.Content>
      </Layout>
    </UserProvider>
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.register();

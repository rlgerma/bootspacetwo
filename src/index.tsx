import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import { Provider as StateProvider } from "react-redux";
import { UserProvider } from "./redux/context";

import store from "./redux/store";

import { Layout } from "antd";

import "./styles/main.less";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider store={store}>
      <UserProvider>
        <Layout className='layout'>
          <Layout.Content style={{ paddingBottom: "2.5rem" }}>
            <App />
          </Layout.Content>
        </Layout>
      </UserProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

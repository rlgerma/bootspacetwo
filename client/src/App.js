import React from "react";
import Application from "./pages/Application";
import UserProvider from "./providers/UserProvider";
import { Layout } from "antd";
import "./styles/App.scss";
function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <UserProvider>
        <Application />
      </UserProvider>
      <Footer className="footer">BootSpace ©2020 Created by rlgerma92</Footer>
    </Layout>
  );
}
export default App;

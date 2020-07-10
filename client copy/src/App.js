import React from "react";
import Application from "./pages/Application";
import UserProvider from "./providers/UserProvider";
import footerImg from "./images/BootSpaceTrans.png";
import { Layout } from "antd";
import "./styles/App.scss";
function App() {
  const { Footer } = Layout;
  return (
    <Layout className="layout">
      <UserProvider>
        <Application />
      </UserProvider>
      <Footer className="footer">
        <img src={footerImg} alt="bootspace" />
        <br />
        ©2020
      </Footer>
    </Layout>
  );
}
export default App;

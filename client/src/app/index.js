import React from "react";
import Application from "../pages/Application";
import UserProvider from "../providers/UserProvider";
import footerImg from "../images/BootSpaceTrans.png";
import { Layout } from "antd";
import "../styles/App.scss";

const App = () => {
  const { Footer, Content } = Layout;
  return (
    <Layout className='layout'>
      <Content style={{ paddingBottom: "2.5rem" }}>
        <UserProvider>
          <Application />
        </UserProvider>
      </Content>
    </Layout>
  );
};
export default App;

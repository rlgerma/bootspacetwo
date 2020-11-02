import React from "react";
import Application from "./pages/Application";
import UserProvider from "./providers/UserProvider";
import footerImg from "./images/BootSpaceTrans.png";
import { Layout } from "antd";
import "./styles/App.scss";

const App = () => {
  const { Footer, Content } = Layout;
  return (
    <Layout className='layout'>
      <Content>
        <UserProvider>
          <Application />
        </UserProvider>
      </Content>
      <Footer className='footer'>
        <img src={footerImg} alt='bootspace' />
        <br />
        ©2020
      </Footer>
    </Layout>
  );
};
export default App;

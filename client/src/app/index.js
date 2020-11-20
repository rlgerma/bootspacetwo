import React from "react";
import Application from "../pages";
import UserProvider from "../providers/UserProvider";
import { Layout } from "antd";
import "../styles/App.scss";

const App = () => {
  const { Content } = Layout;
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

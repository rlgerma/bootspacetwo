import { FC, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "../protected";

import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile";

import NavBar from "../components/layout/NavBar";
import Login from "../components/auth/SignIn";

import { Layout } from "antd";
import { UserContext } from "../redux/context";
import UserHome from "../pages/Home/UserHome";

const App: FC = () => {
  const { authUser } = useContext(UserContext);

  return (
    <Router>
      <Layout className='layout'>
        <Layout.Content style={{ paddingBottom: "2.5rem" }}>
          <NavBar />
          {authUser ? (
            <ProtectedRoute component={UserHome} path='/' />
          ) : (
            <Route component={Home} exact path='/' />
          )}
          <ProtectedRoute component={Profile} exact path='/profile' />

          <Route component={Login} exact path='/login' />
          <Route component={Blog} exact path='/blog' />
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;

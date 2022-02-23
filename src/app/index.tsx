import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "../protected";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile";
import NavBar from "../components/layout/NavBar";
import Login from "../components/auth/SignIn";
import Layout from "antd/lib/layout/layout";
export default function App() {
  return (
    <Router>
      <Layout className='layout'>
        <Layout.Content style={{ paddingBottom: "2.5rem" }}>
          <Route component={NavBar} path='/' />
          <Route component={Home} exact path='/' />
          <Route component={Login} exact path='/login' />
          <Route component={Blog} exact path='/blog' />
          <ProtectedRoute component={Profile} exact path='/profile' />
        </Layout.Content>
      </Layout>
    </Router>
  );
}

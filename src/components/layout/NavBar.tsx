import { FC, useContext } from "react";
import { auth } from "../../firebase";
import { UserContext } from "../../redux/context";
import { NavLink } from "react-router-dom";
import { Input, Select, AutoComplete, Card, Col, Row } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/BootSpaceTrans.png";

const NavBar: FC = () => {
  const { Option } = Select;
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      <Card>
        <Row>
          <Col md={8} sm={24}>
            <NavLink to='/'>
              <img src={logo} alt='bootspace' className='logo' />
            </NavLink>
          </Col>
          <Col md={8} sm={24} />
          <Col md={8} sm={24}>
            <Input.Group className='navSearch'>
              <AutoComplete placeholder='Search for' style={{ width: "75%" }} />
              <Select defaultValue='Posts'>
                <Option value='Posts'>Posts</Option>
                <Option value='Users'>Users</Option>
                <Option value='Groups'>Groups</Option>
              </Select>
            </Input.Group>
          </Col>
        </Row>
        <Row>
          <Col md={16} sm={24} />
          <Col md={8} sm={24}>
            <div className='navLinks'>
              <NavLink to='/'>
                <HomeOutlined /> home
              </NavLink>
              {authUser && (
                <NavLink to='/profile'>
                  <UserOutlined /> profile
                </NavLink>
              )}
              <NavLink to='/blog'>
                <ReadOutlined /> blog
              </NavLink>
              {authUser ? (
                <NavLink to='/' onClick={() => auth.signOut()}>
                  <LogoutOutlined /> log-out
                </NavLink>
              ) : (
                <NavLink to='/login'>
                  <LoginOutlined /> login
                </NavLink>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </nav>
  );
};

export default NavBar;

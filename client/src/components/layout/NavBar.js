import React from "react";
import { Link } from "@reach/router";
import logo from "../../images/BootSpaceTrans.png";
import { HomeOutlined, ReadOutlined, LoginOutlined } from "@ant-design/icons";
import { Input, Select, AutoComplete, Card, Col, Row } from "antd";

const NavBar = () => {
  const { Option } = Select;

  return (
    <nav>
      <Card>
        <Row>
          <Col md={8} sm={24}>
            <img src={logo} alt='bootspace' className='logo' />
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
              <Link to='/'>
                <HomeOutlined /> home
              </Link>
              <Link to='/blog'>
                <ReadOutlined /> blog
              </Link>
              <Link to='/signin'>
                <LoginOutlined /> login
              </Link>
            </div>
          </Col>
        </Row>
      </Card>
    </nav>
  );
};

export default NavBar;

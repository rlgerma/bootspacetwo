import React from "react";
import { Link } from "@reach/router";
import logo from "../../images/icon.png";
import { HomeOutlined, ReadOutlined, LoginOutlined } from "@ant-design/icons";
import { Input, Select, AutoComplete } from "antd";

const NavBar = () => {
  const { Option } = Select;

  return (
    <nav>
      <div className="navLeft">
        <div className="navLogo">
          <img src={logo} alt="bootspace" className="icon" />
          <h2 className="logo"> | BootSpace</h2>
        </div>
      </div>
      <div className="navRight">
        <div className="searchBar">
          <Input.Group>
            <AutoComplete placeholder="Search for" />
            <Select defaultValue="Posts">
              <Option value="Posts">Posts</Option>
              <Option value="Users">Users</Option>
              <Option value="Groups">Groups</Option>
            </Select>
          </Input.Group>
        </div>
        <div className="navLinks">
          <Link to="/">
            <HomeOutlined />
            home
          </Link>
          <Link to="/blog">
            <ReadOutlined />
            blog
          </Link>
          <Link to="/signin">
            <LoginOutlined />
            login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

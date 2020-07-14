import React from "react";
import { Link } from "@reach/router";
import logo from "../../../images/icon.png";
import { auth } from "../../../firebase";
import {
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Select, AutoComplete, Divider } from "antd";
const UseNav = () => {
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
          <div className="navLinks">
            <Link to="/home">
              <HomeOutlined />
              home
            </Link>
            <Link to="/profile">
              <UserOutlined />
              profile
            </Link>
            <Link to="/blog">
              <ReadOutlined />
              blog
            </Link>
            <Link
              to="/"
              onClick={() => {
                auth.signOut();
              }}
            >
              <LogoutOutlined />
              log-out
            </Link>
          </div>
        </div>
      </div>
      <Divider />
    </nav>
  );
};

export default UseNav;

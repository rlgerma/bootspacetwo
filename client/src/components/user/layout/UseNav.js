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
    <header>
      <div className="navLogo">
        <div className="headLeft">
          <img src={logo} alt="bootspace" className="icon" />
          <h2 className="logo"> | BootSpace</h2>
        </div>
        <div className="headRight">
          <Input.Group compact>
            <AutoComplete
              style={{ width: "50%", textAlign: "right", margin: "0" }}
              placeholder="Search for"
            />
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
      <Divider style={{ color: "#466680", width: 500 }} />
    </header>
  );
};

export default UseNav;

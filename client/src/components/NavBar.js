import React, { useContext } from "react";
import { Link } from "@reach/router";
import logo from "../images/bsLogo.jpeg";
import { Input, Select, AutoComplete } from "antd";
import { UserContext } from "../providers/UserProvider";

const NavBar = () => {
  const user = useContext(UserContext);

  const { Option } = Select;

  const options = [
    {
      value: "searchTerm",
      label: "Search for",
      children: [
        {
          value: "posts",
          label: "posts",
        },
        {
          value: "users",
          label: "users",
        },
        {
          value: "groups",
          label: "groups",
        },
      ],
    },
  ];
  return (
    <header>
      <div className="navLogo">
        <img src={logo} alt="bootspace" />
      </div>
      <div className="search">
        <Input.Group compact>
          <AutoComplete style={{ width: "30%" }} placeholder="Search for" />

          <Select defaultValue="Posts">
            <Option value="Posts">Posts</Option>
            <Option value="Users">Users</Option>
            <Option value="Groups">Groups</Option>
          </Select>
        </Input.Group>
      </div>
      <div className="nav" id="nav">
        <Link to="/">
          <u>Home</u>
        </Link>
        <Link to="/mail"> Mail </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="/friends"> Friends </Link>
        <Link to="/music"> Music </Link>
        <Link to="/news"> Bootspace News </Link>
        <Link to="/signin">Login</Link>
      </div>
    </header>
  );
};

export default NavBar;

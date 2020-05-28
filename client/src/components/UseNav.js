import React from "react";
import { Link } from "@reach/router";
import logo from "../images/icon.png";
import { auth } from "../firebase";
import { Input, Select, AutoComplete } from "antd";
const UseNav = () => {
  const { Option } = Select;

  // const options = [
  //   {
  //     value: "searchTerm",
  //     label: "Search for",
  //     children: [
  //       {
  //         value: "posts",
  //         label: "posts",
  //       },
  //       {
  //         value: "users",
  //         label: "users",
  //       },
  //       {
  //         value: "groups",
  //         label: "groups",
  //       },
  //     ],
  //   },
  // ];
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
            <Link to="/home">home</Link>
            <Link to="/profile"> profile </Link>
            <Link to="/blog"> blog </Link>
            <Link
              to="/"
              onClick={() => {
                auth.signOut();
              }}
            >
              log-out
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UseNav;

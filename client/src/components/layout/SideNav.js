import React from "react";
import { Link } from "@reach/router";
import { Menu, Button, Affix } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

class SideNav extends React.Component {
  state = {
    collapsed: true,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className={this.state.show ? "active" : "hidden"} id="sideNav">
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/profile"> profile</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ReadOutlined />}>
            <Link to="/blog">blog</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="/">log-out</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SideNav;

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/boot.png";
import { Container, Row } from "reactstrap";

const NavBar = () => {
  return (
    <Container>
      <header>
        <Row>
          <div className="navLogo">
            <img src={logo} alt="bootspace" />
          </div>
          <div className="search">
            <input type="text" placeholder={"Search on BootSpace!"} />
            <select>
              <option>Web</option>
              <option>Bootspace</option>
            </select>
            <button>Search</button>
            <button id="menuToggle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
              </svg>
            </button>
          </div>
        </Row>
        <div className="nav">
          <NavLink tag={NavLink} to="/">
            <u>Home</u>
          </NavLink>

          <NavLink to="/mail"> Mail </NavLink>
          <NavLink to="/profile"> Profile </NavLink>
          <NavLink to="/friends"> Friends </NavLink>
          <NavLink to="/music"> Music </NavLink>
          <NavLink to="/news"> Bootspace News </NavLink>
          <NavLink to="#">LogOut</NavLink>
        </div>
      </header>
    </Container>
  );
};

export default NavBar;

import React from "react";
import { Link } from "@reach/router";
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
          <Link to="/">
            <u>Home</u>
          </Link>

          <Link to="/mail"> Mail </Link>
          <Link to="/profile"> Profile </Link>
          <Link to="/friends"> Friends </Link>
          <Link to="/music"> Music </Link>
          <Link to="/news"> Bootspace News </Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    </Container>
  );
};

export default NavBar;

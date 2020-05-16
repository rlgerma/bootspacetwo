import React from 'react';
import logo from '../images/boot.png';
import { Container } from 'reactstrap';

const Footer = () => (
  <Container>
    <footer>
      <div className="logo">
        <img src={logo} alt={'bootspace'} />
      </div>
    </footer>
  </Container>
);

export default Footer;

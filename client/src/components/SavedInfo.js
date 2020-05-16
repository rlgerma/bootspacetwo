import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import API from '../utils/API';

function SavedInfo(props) {
  const [users, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    API.getUser(id)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs="md-12">
          <h1>{users.coding}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="md-10 md-offset-1">
          <profile>
            <h1>About Me</h1>
            <p>{users.about}</p>
          </profile>
        </Col>
      </Row>
    </Container>
  );
}

export default SavedInfo;

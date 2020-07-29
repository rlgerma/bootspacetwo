import React from "react";
import loading from "./loading.svg";
import { Card, Row, Col } from "antd";

const Spinner = () => (
  <>
    <Col>
      <Card>
        <img src={loading} alt="loading" />
      </Card>
    </Col>
  </>
);
export default Spinner;

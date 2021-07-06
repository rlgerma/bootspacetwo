import React from "react";
import { Row, Col, Card } from "antd";

const Metrics = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className='gutter-row' span={20} offset={1} flex={5}>
        <Card>
          {/* <Statistic title="Public Repos" value={userData.repos} /> */}
        </Card>
      </Col>
    </Row>
  );
};
// };
export default Metrics;

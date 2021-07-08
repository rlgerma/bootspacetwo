import React from "react";
import { Card, Row, Layout } from "antd";

export default function Blog() {
  const { Content } = Layout;

  return (
    <Content>
      <Row className='blogRow'>
        <Card title='👷🏻‍♂️ Under Development' className='blogCard'>
          <p>Check back soon! ✌🏻</p>
        </Card>
      </Row>
    </Content>
  );
}

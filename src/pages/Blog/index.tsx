import { FC } from "react";
import { Card, Row, Layout } from "antd";

const Blog: FC = () => {
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
};

export default Blog;

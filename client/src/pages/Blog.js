import React, { useEffect, useState } from "react";
import { Card, Row, Layout } from "antd";

export default function Blog() {
  const { Content } = Layout;
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    async function loadBlog() {
      const response = await fetch(
        "https://wp-react-demo.flywheelsites.com/wp-json/wp/v2/posts"
      );
      if (!response.ok) {
        return;
      }

      const blog = await response.json();
      setBlog(blog);
    }

    loadBlog();
  }, []);
  return (
    <Content>
      {blog.map((post, index) => (
        <Row gutter={{ xs: 4 }} key={index}>
          <Card title={post.title.rendered} className="blogCard">
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </Card>
        </Row>
      ))}
    </Content>
  );
}

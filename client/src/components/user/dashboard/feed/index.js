import React from "react";
import { Card, Input } from "antd";
const { TextArea } = Input;

const PostFeed = () => {
  return (
    <>
      <Card title={"Posts"} className="postFeed">
        <TextArea
          rows={4}
          placeholder={"what's on your mind?"}
          maxLength={140}
        />
      </Card>
    </>
  );
};
export default PostFeed;

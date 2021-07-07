import React from "react";
// import { Comment, Avatar } from "antd";
import { Input, Button, Skeleton } from "antd";

const Post = ({ user }) => {
  const { TextArea } = Input;
  console.log(user);
  return (
    <>
      {user === null ? (
        <Skeleton />
      ) : (
        <>
          <TextArea rows={4} />
          <Button>Post</Button>
        </>
      )}
    </>
  );
};

export default Post;

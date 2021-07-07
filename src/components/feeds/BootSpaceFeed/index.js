import React from "react";
import dayjs from "dayjs";
import { Comment, Tooltip, Avatar, Skeleton } from "antd";

const BootSpaceFeed = ({ feed }) => {
  console.log(feed);
  return feed ? (
    <>
      {feed.map((post) => (
        <Comment
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm:ss")}>
              <span></span>
            </Tooltip>
          }
        />
      ))}
    </>
  ) : (
    <Skeleton active />
  );
};

export default BootSpaceFeed;

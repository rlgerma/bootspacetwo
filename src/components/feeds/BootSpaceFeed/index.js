import React from "react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Comment, Tooltip, Avatar, Skeleton } from "antd";

const BootSpaceFeed = ({ feed }) => {
  const convertTime = (ref) =>
    new Date(ref.seconds * 1000 + ref.nanoseconds / 1000000);

  const relTime = dayjs.extend(relativeTime);

  return feed ? (
    <>
      {feed.posts.reverse().map((post, index) => (
        <Comment
          key={index}
          author={post.author}
          avatar={<Avatar src={`${post.avatar}`} alt={post.author} />}
          content={post.content}
          datetime={
            <Tooltip
              title={dayjs(convertTime(post.date)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            >
              <span>{relTime(convertTime(post.date)).fromNow(true)} ago</span>
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

import React from "react";
import { Row, Comment, Tooltip, Avatar, Skeleton } from "antd";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

export const LoadingPost = () => (
  <Row>
    <Comment
      avatar={<Skeleton avatar active />}
      content={<Skeleton paragraph={{ rows: 1, width: 400 }} active />}
    />
  </Row>
);

const GitHubFeed = ({ feed }) => {
  const relTime = dayjs.extend(relativeTime);

  return !feed ? (
    <>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </>
  ) : (
    <>
      {feed.map((user) => (
        <Row key={user.id}>
          <Comment
            author={user.actor.login}
            avatar={
              <Avatar src={user.actor.avatar_url} alt={user.actor.login} />
            }
            content={
              <p>
                {user.type === "CreateEvent"
                  ? `created a new ${user.payload.ref_type} ${
                      user.payload.ref_type === "repository" ? "" : "for"
                    }`
                  : user.type === "PullRequestEvent"
                  ? `${user.payload.action} a pull request for`
                  : user.type === "WatchEvent"
                  ? "is now watching"
                  : user.type === "DeleteEvent"
                  ? `removed ${user.payload.ref_type} for`
                  : user.type === "ReleaseEvent"
                  ? `released ${user.payload.release.tag_name} for`
                  : user.type === "PushEvent"
                  ? `pushed ${user.payload.ref} to`
                  : ""}{" "}
                <a href={user.repo.url}>{user.repo.name}</a>
              </p>
            }
            datetime={
              <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm")}>
                <span>{relTime(user.created_at).fromNow(true)}</span>
              </Tooltip>
            }
          />
        </Row>
      ))}
    </>
  );
};

export default GitHubFeed;

import React, { createElement, useState } from "react";
import { Row, Comment, Tooltip, Avatar, Skeleton } from "antd";
import dayjs from "dayjs";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const GitHubFeed = ({ feed }) => {
  const [action, setAction] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,
    <span key='comment-basic-reply-to'>Comment</span>,
  ];
  return (
    <>
      {feed === undefined ? (
        <Skeleton active />
      ) : (
        <>
          <ul>
            {feed.map((user) => (
              <Row key={user.id}>
                <Comment
                  actions={actions}
                  author={user.actor.login}
                  avatar={
                    <Avatar
                      src={user.actor.avatar_url}
                      alt={user.actor.login}
                    />
                  }
                  content={
                    <p>
                      {user.type} {user.payload.action} on{" "}
                      <a href={user.repo.url}>{user.repo.name}</a>
                    </p>
                  }
                  datetime={
                    <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm")}>
                      <span>{dayjs(user.created_at).format()}</span>
                    </Tooltip>
                  }
                />
              </Row>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default GitHubFeed;

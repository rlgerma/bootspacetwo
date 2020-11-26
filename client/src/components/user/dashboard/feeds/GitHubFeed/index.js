import React, { createElement, useEffect, useState } from "react";
import { Row, Comment, Tooltip, Avatar, Spin, Skeleton } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { userData, token } from "../../../../../firebase";

const GitHubFeed = () => {
  const [error, setError] = useState(null);
  const [action, setAction] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const someData = await userData;
      const events = `https://api.github.com/users/${someData.login}/received_events`;
      fetch(events, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          let data = [];
          data.push(result);
          setIsLoaded(true);
          setData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        });
    };
    if (userData !== null) {
      getData();
    } else {
      console.log("loading...");
    }
  }, []);

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
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Comment</span>,
  ];
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <ul>
          {data.map((user) => (
            <Row key={user.id}>
              <Comment
                actions={actions}
                author={user.actor.login}
                avatar={
                  <Avatar src={user.actor.avatar_url} alt={user.actor.login} />
                }
                content={
                  <p>
                    {user.type} {user.payload.action} on{" "}
                    <a href={user.repo.url}>{user.repo.name}</a>
                  </p>
                }
                datetime={
                  <Tooltip title={moment().format("YYYY-MM-DD HH:mm")}>
                    <span>{moment(user.created_at).fromNow()}</span>
                  </Tooltip>
                }
              />
            </Row>
          ))}
        </ul>
      )}
    </>
  );
};

export default GitHubFeed;

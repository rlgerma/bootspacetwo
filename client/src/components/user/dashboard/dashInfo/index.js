import React, { createElement, useEffect, useContext, useState } from "react";
import { Row, Comment, Tooltip, Avatar } from "antd";
import { UserContext } from "../../../../providers/UserProvider";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const token = JSON.parse(sessionStorage.getItem("githubToken"));

const DashInfo = () => {
  const user = useContext(UserContext);
  const { userData } = user;
  const [error, setError] = useState(null);
  const [action, setAction] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const events = `https://api.github.com/users/${userData.login}/received_events`;

  useEffect(() => {
    fetch(events, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let data = [];
          data.push(result);
          setIsLoaded(true);
          setData(data[0]);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (data === null) {
    return <p>loading posts..{setTimeout(window.location.reload(), 2000)}</p>;
  } else {
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
    );
  }
};

export default DashInfo;

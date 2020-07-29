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
const DashInfo = () => {
  const user = useContext(UserContext);
  const { userData } = user;
  const [error, setError] = useState(null);
  const [action, setAction] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const events = `https://api.github.com/users/${userData.login}/received_events`;
  const dashData = JSON.parse(sessionStorage.getItem("events"));

  useEffect(() => {
    fetch(events)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
          sessionStorage.setItem("events", JSON.stringify(result));
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
  } else if (dashData === null) {
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
        {dashData.map((item) => (
          <Row key={item.id}>
            <Comment
              actions={actions}
              author={item.actor.login}
              avatar={
                <Avatar src={item.actor.avatar_url} alt={item.actor.login} />
              }
              content={
                <p>
                  {item.type} {item.payload.action} on{" "}
                  <a href={item.repo.url}>{item.repo.name}</a>
                </p>
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm")}>
                  <span>{moment(item.created_at).fromNow()}</span>
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

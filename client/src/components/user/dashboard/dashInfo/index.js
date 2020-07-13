import React, { createElement, useEffect, useContext, useState } from "react";
import { Row, Col, Comment, Tooltip, Avatar } from "antd";
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
  const [error, setError, action, setAction] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const events = `https://api.github.com/users/${userData.login}/received_events`;
  useEffect(() => {
    fetch(events)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
          localStorage.setItem("events", JSON.stringify(result));
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
  } else {
    const dashData = JSON.parse(localStorage.getItem("events"));
    console.log(dashData);

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
      <span key="comment-basic-reply-to">Reply to</span>,
    ];
    return (
      <>
        {!!dashData.length &&
          dashData.map((item) => (
            <Row gutter={16} key={item.id}>
              <Comment
                actions={actions}
                author={item.id}
                avatar={<Avatar src={item.org} alt="Han Solo" />}
                content={
                  <p>
                    We supply a series of design principles, practical patterns
                    and high quality design resources (Sketch and Axure), to
                    help people create their product prototypes beautifully and
                    efficiently.
                  </p>
                }
                datetime={
                  <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                    <span>{item.created_at}</span>
                  </Tooltip>
                }
              />
            </Row>
          ))}
      </>
    );
  }
};

export default DashInfo;

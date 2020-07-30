import React, { createElement, useState } from "react";
import { Row, Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const feedData = JSON.parse(sessionStorage.getItem("feed"));
const FeedList = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
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
      {feedData
        .slice(0)
        .reverse()
        .map((item) => (
          <Row gutter={16} key={item.id}>
            <Comment
              style={{ marginLeft: "3%" }}
              actions={actions}
              author={item.author}
              avatar={<Avatar src={item.avatar} alt={item.author} />}
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm")}>
                  <span>{item.datetime}</span>
                </Tooltip>
              }
            />
          </Row>
        ))}{" "}
    </>
  );
};

export default FeedList;
import React, { createElement, useState } from "react";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import { db, auth, firestore } from "../../../firebase";
import { LoadingPost } from "../GitHubFeed";
import { Comment, Tooltip, Avatar } from "antd";
import {
  // DislikeOutlined,
  LikeOutlined,
  // DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const BootSpaceFeed = ({ feed }) => {
  const [actionState, setActionState] = useState([]);

  const userActions = (post) => actionState.some((i) => post === i);

  const unlike = (post) => actionState.splice(actionState.indexOf(post), 1);

  const convertTime = (ref) =>
    new Date(ref.seconds * 1000 + ref.nanoseconds / 1000000);

  const relTime = dayjs.extend(relativeTime);

  const postAction = (event, action, post) => {
    event.preventDefault();
    if (action !== null) {
      return db
        .collection("users")
        .doc(`${auth.currentUser.uid}`)
        .collection("actions")
        .doc(
          `${
            action === "like"
              ? "likes"
              : action === "dislike"
              ? "dislikes"
              : "unset"
          }`
        )
        .set(
          {
            posts: firestore.FieldValue.arrayUnion(post),
          },
          { merge: true }
        )
        .then(() => setActionState([...actionState, post]))
        .catch((error) => console.error(error));
    }
  };

  return feed ? (
    <>
      {feed.posts.reverse().map((post, index) => (
        <Comment
          key={index}
          author={post.data.author}
          avatar={<Avatar src={`${post.data.avatar}`} alt={post.data.author} />}
          content={post.data.content}
          datetime={
            <Tooltip
              title={dayjs(convertTime(post.data.date)).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            >
              <span>
                {relTime(convertTime(post.data.date)).fromNow(true)} ago
              </span>
            </Tooltip>
          }
          actions={[
            <Tooltip key='comment-basic-like' title='Like'>
              <span
                onClick={(event) =>
                  userActions(post.id)
                    ? unlike(post.id)
                    : postAction(event, "like", post.id)
                }
              >
                {createElement(
                  userActions(post.id) ? LikeFilled : LikeOutlined
                )}
                <span className='comment-action'>{post.data.likes}</span>
              </span>
            </Tooltip>,
            <span key='comment-basic-reply-to'>Reply to</span>,
          ]}
        />
      ))}
    </>
  ) : (
    <>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </>
  );
};

export default BootSpaceFeed;

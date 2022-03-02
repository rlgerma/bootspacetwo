import { FC, MouseEvent, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { db, auth, firestore } from "../../../firebase";
import { LoadingPost } from "../GitHubFeed";
import { Comment, Tooltip, Avatar } from "antd";
import {
  // DislikeOutlined,
  LikeOutlined,
  // DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
interface Props {
  feed: {
    posts: {
      data: {
        author: string;
        avatar: string;
        content: string;
        date: {
          seconds: number;
          nanoseconds: number;
        };
        likes: number;
      };
      id: string;
    }[];
  };
  actions: {
    actions: {
      likes: {
        posts: unknown[];
      };
    }[];
  };
}
const BootSpaceFeed: FC<Props> = ({ feed, actions }) => {
  const [actionState, setActionState] = useState(actions.actions[0].likes.posts ?? []);

  const userActions = (post: unknown) => actionState.some((i) => i === post);

  const unlike = (post: unknown) => actionState.splice(actionState.indexOf(post), 1);

  const convertTime = (ref: { seconds: number; nanoseconds: number }) =>
    new Date(ref.seconds * 1000 + ref.nanoseconds / 1000000);

  dayjs.extend(relativeTime);

  const postAction = async (
    event: MouseEvent<HTMLSpanElement, MouseEvent>,
    action: string,
    post: unknown
  ) => {
    try {
      event.preventDefault();
      if (action)
        return db
          .collection("users")
          .doc(`${auth.currentUser?.uid}`)
          .collection("actions")
          .doc(`${action === "like" ? "likes" : action === "dislike" ? "dislikes" : "unset"}`)
          .update({
            posts:
              action === "like"
                ? firestore.FieldValue.arrayUnion(post)
                : firestore.FieldValue.arrayRemove(post),
          })
          .then(() => setActionState([...actionState, post]))
          .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return feed ? (
    <>
      {feed.posts
        .map((post, index) => (
          <Comment
            key={index}
            author={post.data.author}
            avatar={<Avatar src={`${post.data.avatar}`} alt={post.data.author} />}
            content={post.data.content}
            datetime={
              <Tooltip title={dayjs(convertTime(post.data.date)).format("YYYY-MM-DD HH:mm:ss")}>
                <span>{dayjs(convertTime(post.data.date)).fromNow(true)} ago</span>
              </Tooltip>
            }
            actions={[
              <Tooltip key='comment-basic-like' title='Like'>
                <span>
                  <span className='comment-action'>{post.data.likes}</span>
                </span>
              </Tooltip>,
              <span key='comment-basic-reply-to'>Reply to</span>,
            ]}
          />
        ))
        .reverse()}
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

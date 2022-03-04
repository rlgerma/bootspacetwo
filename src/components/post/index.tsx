import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { auth, db, firestore } from "../../firebase";
import { Input, Button, Skeleton } from "antd";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    avatar_url: string;
  };
}

const Post: FC<Props> = ({ user }) => {
  const { TextArea } = Input;
  const [post, setPost] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const submitPost = async (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    post: string
  ) => {
    try {
      event.preventDefault();
      if (post === "") {
        setErr("Posts must not be empty");
        return;
      } else {
        return db
          .collection("feed")
          .add({
            author: `${user.firstName} ${user.lastName}`,
            avatar: `${user.avatar_url}`,
            content: post,
            date: firestore.FieldValue.serverTimestamp(),
            likes: 0,
            dislikes: 0,
            comments: [],
          })
          .then((doc) =>
            db
              .collection("users")
              .doc(`${auth.currentUser?.uid}`)
              .collection("posts")
              .doc(`${doc.id}`)
              .set({ ref: doc.path })
              .then(() => setSuccess("Post added!"))
              .catch((error) => console.error(error))
          )
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(error);
      setErr(err + " " + error);
    } finally {
      setPost("");
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setPost(event.currentTarget.value);

  return !user ? (
    <Skeleton />
  ) : (
    <>
      <h3>New post</h3>

      <TextArea rows={4} onChange={(event) => handleInput(event)} value={post} />

      <Button onClick={(event) => submitPost(event, post)}>Post</Button>
      {success !== "" && <p>{success}</p>}
      {err !== "" && <p>{err}</p>}
    </>
  );
};

export default Post;

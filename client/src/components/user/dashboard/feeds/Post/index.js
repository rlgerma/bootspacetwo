import React from "react";
import {
  Divider,
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Spin,
} from "antd";
import { Skeleton } from "antd";
import moment from "moment";
import firebase from "firebase";
import { userData } from "../../../../../firebase";
const { TextArea } = Input;
const newPostKey = firebase.database().ref().child("posts").push().key;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={
      <Divider orientation="left">
        <Spin />
      </Divider>
    }
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder={"what's on your mind?"}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Post!
      </Button>
    </Form.Item>
  </>
);

class PostFeed extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      firebase
        .database()
        .ref("feed/posts/" + newPostKey)
        .update({
          author: `${userData.name}`,
          avatar: `${userData.avatar_url}`,
          content: `${this.state.value}`,
          datetime: moment().format("LLL"),
        });
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: `${userData.name}`,
            avatar: `${userData.avatar_url}`,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <>
        {userData === null ? (
          <Skeleton />
        ) : (
          <>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={<Avatar src={userData.avatar_url} alt={userData.name} />}
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </>
        )}
      </>
    );
  }
}

export default PostFeed;

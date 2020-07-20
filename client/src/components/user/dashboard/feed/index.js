import React from "react";
import { Divider, Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { firestore } from "../../../../firebase";
const { TextArea } = Input;
const _userData = JSON.parse(localStorage.getItem("bootSpaceUser"));

const CommentList = ({ comments, feedData }) => (
  <List
    dataSource={comments}
    header={<Divider orientation="left">Your Feed</Divider>}
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
      firestore
        .collection("feed")
        .add({
          comments: [
            {
              author: `${_userData.name}`,
              avatar: `${_userData.avatar_url}`,
              content: `${this.state.value}`,
              datetime: moment().format("YYYY-MM-DD HH:mm"),
            },
          ],
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: `${_userData.name}`,
            avatar: `${_userData.avatar_url}`,
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
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src={_userData.avatar_url} alt={_userData.name} />}
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
    );
  }
}

export default PostFeed;

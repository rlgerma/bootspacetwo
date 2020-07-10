import React from "react";
import firebase from "../../../firebase";

("use strict");
class Post extends React.Component {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  toString() {
    return this.title + ", by " + this.author;
  }
}
const postConverter = {
  toFirestore(post) {
    return { title: post.title, author: post.author };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Post(data.title, data.author);
  },
};
const postSnap = await firebase
  .firestore()
  .collection("posts")
  .withConverter(postConverter)
  .doc()
  .get();
const post = postSnap.data();
if (post !== undefined) {
  post.title; // string
  post.toString(); // Should be defined
  post.someNonExistentProperty; // TS error
}

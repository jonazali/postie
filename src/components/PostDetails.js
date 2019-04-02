import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../API";
import "../css/PostDetails.css";

export default class PostDetails extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      post: {},
      comments: [],
      postedBy: {}
    };
  }

  componentDidMount = async () => {
    // const postResponse = await API.getPost(this.props.match.params.postId);
    // // this.setState({ post: postResponse.data });

    // const userResponse = await API.getUser(postResponse.data.userId);
    // // this.setState({ postedBy: userResponse.data });

    // const commentsResponse = await API.getPostComments(
    //   this.props.match.params.postId
    // );
    // // this.setState({ comments: commentsResponse.data });

    // this.setState({
    //   post: postResponse.data,
    //   postedBy: userResponse.data,
    //   comments: commentsResponse.data
    // });

    // set loading state to true
    const promise1 = this.getPostWithUser();
    const promise2 = this.getComments();
    // Promise.all creates a new promise that holds promise1 and promise2 (resolves once both)
    await Promise.all([promise1, promise2]);
    // set loading state to false
    console.log("all content loaded!");
  };

  getPostWithUser = async () => {
    const post = await API.getPost(this.props.match.params.postId);
    this.setState({ post });

    const postedBy = await API.getUser(post.userId);
    this.setState({ postedBy });
  };

  getComments = async () => {
    const commentsResponse = await API.getPostComments(
      this.props.match.params.postId
    );
    this.setState({ comments: commentsResponse.data });
    console.log("comments loaded");
  };

  render() {
    const { post, postedBy, comments } = this.state;
    return (
      <div className="post-details container">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>Posted by {postedBy.name}</p>

        <div className="comments">
          <h3>Comments</h3>
          <ul className="list">
            {comments.map(comment => (
              <li key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

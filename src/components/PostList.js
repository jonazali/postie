import React, { Component } from "react";
import { Link } from "react-router-dom";
import base from "../base";
import "../css/PostList.css";
import API from "../API";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
      likes: {}
    };
  }

  componentDidMount = () => {
    API.getAllPosts(this.state.page).then(res => this.setState({ posts: res.data }));

    this.ref = base.syncState("likes", {
      context: this,
      state: "likes"
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page) {
      API.getAllPosts(this.state.page).then(res => this.setState({ posts: res.data }));
    }
  };

  handlePageChange = (next) => {
    if (next && this.state.page < 10) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    } else if (!next && this.state.page > 1) {
      this.setState(prevState => ({ page: prevState.page - 1 }));
    }
  };

  handleUpvotes = (postId) => {
    // this.setState((prevState) => {
    //   const updatedLikes = { ...prevState };
    //   updatedLikes[postId] = updatedLikes[postId]
    //     ? updatedLikes[postId] + 1
    //     : 1;
    //   return { likes: updatedLikes };
    // });

    this.setState((prevState) => {
      const updatedLikes = {
        ...prevState.likes,
        [postId]: prevState.likes[postId] ? prevState.likes[postId] + 1 : 1
      };

      return { likes: updatedLikes };
    });
  };

  render() {
    const { likes } = this.state;
    return (
      <div className="post-list container">
        <ul className="list">
          {this.state.posts.map(post => (
            <li key={post.id}>
              <p className="list-item-title">{post.title}</p>
              <Link to={`/posts/${post.id}`} className="details">
                Details
              </Link>
              <div className="likes">
                <button
                  type="button"
                  onClick={() => this.handleUpvotes(post.id)}
                >
                  {" "}
                  <span role="img" aria-label="fingerup">
                    🖕
                  </span>
                </button>
                <span>{likes[post.id] ? likes[post.id] : 0}</span>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => this.handlePageChange(false)}>
          &lt; Prev page
        </button>
        <span>{this.state.page}</span>
        <button type="button" onClick={() => this.handlePageChange(true)}>
          Next page &gt;
        </button>
      </div>
    );
  }
}

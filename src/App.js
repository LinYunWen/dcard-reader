import React from 'react';
import './App.css';
import { getPosts } from './api';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      posts: []
    }
  }

  async componentDidMount() {
    let { data, error } = await getPosts();
    this.setState({
      isLoading: false,
      isError: error ? true : false,
      posts: data ? data : []
    })
  }

  render() {
    let { isLoading, isError, posts } = this.state;
    // console.log(posts, this.state, this.state.posts);

    if (isError) {
      return <div>something wrong. Please try again.</div>
    }
    if (isLoading) {
      return <div>is loading...</div>
    }

    if (posts.length === 0) {
      return <div>There is no post.</div>
    } else {
      return (
        <div>
          {
            posts.map((post, index) => {
              return (<div key={index}>
                <div>{post.title}</div>
                <div>{post.excerpt}</div>
              </div>);
            })
          }
        </div>
      );
    }
  }
}


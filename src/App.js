import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { getPosts } from './api';
import { PostCard } from './PostCard';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      posts: []
    }

    this.scrollEventHandler = this.scrollEventHandler.bind(this);
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.scrollEventHandler)

    let { data, error } = await getPosts();
    this.setState({
      isLoading: false,
      isError: error ? true : false,
      posts: data ? data : []
    })
  }


  async scrollEventHandler(event) {
    // console.log(event);
    let postComponents = document.querySelectorAll(".post");
    let lastPostComponent = postComponents[postComponents.length - 1];
    let eleRect = lastPostComponent.getBoundingClientRect();

    let posts = this.state.posts;
    if (eleRect.y < window.innerHeight) {
      let { data, error } = await getPosts(posts[posts.length - 1].id);

      this.setState({
        isLoading: false,
        isError: error ? true : false,
        posts: data ? this.state.posts.concat(data) : this.state.posts
      })
    }
  }

  genPostComponents(posts) {
    let start = this.state.posts.length;
    let postComponents = posts.map((post, index) => {
    //   return (<div key={start + index} className="post">
    //     <div>{post.title}</div>
    //     <div>{post.excerpt}</div>
    //   </div>);
        return (<PostCard key={start + index} post={post} />)
    })
    return postComponents;
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
        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <span style={{ padding: "10px 5%", fontWeight: "bold", fontSize: "20px" }}>Dcard Reader</span>
          </AppBar>
          <Container style={{ marginTop: "60px"}} maxWidth="md">
            <div>
              {this.genPostComponents(posts)}
            </div>
          </Container>
        </React.Fragment>
      );
    }
  }
}


import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { getPosts } from './api';
import { PostCard } from './PostCard';
import { WarnAndErrorPage } from './WarnAndErrorPage';
import { LoadPage } from './LoadPage';

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
        return (<PostCard key={start + index} post={post} />)
    })
    return postComponents;
  }

  genContent() {
    let { isLoading, isError, posts } = this.state;

    if (isLoading) {
      return <LoadPage />
    } else {
      if (isError) return <WarnAndErrorPage type="error" />;
      else {
        if (posts.length === 0) {
          return <WarnAndErrorPage type="warn" />
        } else {
          return this.genPostComponents(posts);
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <span style={{ padding: "10px 5%", fontWeight: "bold", fontSize: "20px" }}>Dcard Reader</span>
        </AppBar>
        <Container style={{ marginTop: "60px"}} maxWidth="md">
          {this.genContent()}
        </Container>
      </React.Fragment>
    );
  }
}


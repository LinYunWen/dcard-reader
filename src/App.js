import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PostCard } from './PostCard';
import { WarnAndErrorPage } from './WarnAndErrorPage';
import { LoadPage } from './LoadPage';
import { getPosts } from './api';
import './app.scss';
import "./base.scss";

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
      // isError: true,
      posts: data ? data : []
      // posts: []
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
          <span className="bold app-bar-title">Dcard Reader</span>
        </AppBar>
        <Container className="margin-top-60" maxWidth="md">
          {this.genContent()}
        </Container>
      </React.Fragment>
    );
  }
}


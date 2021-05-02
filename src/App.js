import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Content } from './Content';
import { getPosts } from './api';
import './app.scss';

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
      // isLoading: true,
      isError: error ? true : false,
      // isError: true,
      posts: data ? data : []
      // posts: []
    })
  }

  async scrollEventHandler(event) {
    // console.log(event);
    if (this.state.isLoading) return;

    let postComponents = document.querySelectorAll(".post");
    if (postComponents.length === 0) return;
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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <span className="bold app-bar-title">Dcard Reader</span>
        </AppBar>
        <Content isError={this.state.isError} isLoading={this.state.isLoading} posts={this.state.posts} />
      </React.Fragment>
    );
  }
}


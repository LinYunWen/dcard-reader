import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Content } from "./Content";
import { getPosts } from "../api";
import "../scss/app.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appendLoading: false,
      isError: false,
      posts: [],
    };

    this.scrollEventHandler = this.scrollEventHandler.bind(this);
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.scrollEventHandler);

    let { data, error } = await getPosts();
    this.setState({
      isLoading: false,
      // isLoading: true,
      isError: error ? true : false,
      // isError: true,
      posts: data ? data : [],
      // posts: []
    });
  }

  async scrollEventHandler(event) {
    if (this.state.appendLoading) return;

    let lastCard = document.querySelector("#last-card");
    if (lastCard === null) return;
    let eleRect = lastCard.getBoundingClientRect();

    let posts = this.state.posts;
    if (eleRect.y < window.innerHeight) {
      this.setState({ appendLoading: true });
      let { data, error } = await getPosts(posts[posts.length - 1].id);

      this.setState({
        isLoading: false,
        appendLoading: false,
        isError: error ? true : false,
        posts: data ? this.state.posts.concat(data) : this.state.posts,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar>
          <span className="bold app-bar-title">Dcard Reader</span>
        </AppBar>
        <Content state={this.state} />
      </React.Fragment>
    );
  }
}

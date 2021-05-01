import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
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
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <span style={{ padding: "10px 5%", fontWeight: "bold", fontSize: "20px" }}>Dcard Reader</span>
          </AppBar>
          <Container style={{ marginTop: "60px"}} maxWidth="md">
            <Grid container spacing={2} style={{ position: "absolute", top: "40vh" }}>
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <div style={{ width: 100, height: 100, margin: "0 auto" }}>
                  <CancelIcon style={{ fontSize: 100, color: "red" }} />
                </div>
              </Grid>
              <Grid item sm={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant={"h4"} style={{ color: "red", lineHeight: "unset" }}>There are something wrong. Please check your network and try again.</Typography>
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )
    }
    if (isLoading) {
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <span style={{ padding: "10px 5%", fontWeight: "bold", fontSize: "20px" }}>Dcard Reader</span>
          </AppBar>
          <Container style={{ marginTop: "60px"}} maxWidth="md">
            <Paper style={{ marginBottom: "10px", padding: "20px" }}>
            <Grid container spacing={1}>
                <Grid item sm={3} style={{ height: "140px" }}>
                  <Skeleton animation={"wave"} variant="rect" style={{ height: "100%" }} />
                </Grid>
                <Grid item sm={9} container>
                    <Grid item container>
                      <Grid item sm={12}>
                        <Typography variant="h3">
                          <Skeleton />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item sm={12}>
                        <Skeleton animation="wave" width="80%"/>
                        <Skeleton animation="wave" width="60%"/>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item>
                        <Skeleton animation="wave" variant="circle" width={20} height={20}/>
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="circle" width={20} height={20}/>
                      </Grid>
                      <Grid item>
                        <Skeleton animation="wave" variant="circle" width={20} height={20}/>
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
          </Container>
        </React.Fragment>
      )
    }

    if (posts.length === 0) {
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <span style={{ padding: "10px 5%", fontWeight: "bold", fontSize: "20px" }}>Dcard Reader</span>
          </AppBar>
          <Container style={{ marginTop: "60px"}} maxWidth="md">
            <Grid container spacing={2} style={{ position: "absolute", top: "40vh" }}>
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <div style={{ width: 100, height: 100, margin: "0 auto" }}>
                  <WarningIcon style={{ fontSize: 100, color: "yellow" }} />
                </div>
              </Grid>
              <Grid item sm={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant={"h4"} style={{ color: "yellow", lineHeight: "unset" }}>There is no post.</Typography>
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )
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


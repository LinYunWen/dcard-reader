import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

export class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.post = this.props.post;
  }

  render() {
    console.log(this.post, this.post.mediaMeta, this.post.mediaMeta[0])
    return (
    <div className="post">
        <Paper style={{ margin: "5%", padding: "10px" }}>
            <Grid container>
                <Grid item sm={3}>
                    <img style={{ maxHeight: "128px", maxWidth: "128px" }} src={this.post.mediaMeta[0]?.thumbnail}></img>
                </Grid>
                <Grid item sm={9} container>
                    <Grid item>
                        <span>{this.post.title}</span>
                    </Grid>
                    <Grid item>
                        <span>{this.post.excerpt}</span>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
    );
  }
}


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

export class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.post = this.props.post;
  }

  genReactions(reactions) {
      return reactions.map((reaction, index) => {
          return (<Grid item key={index}>
            <span>{reaction.count}</span>
        </Grid>)
      });
  }

  addGender(gender) {
    let style = {
        width: 0,
        height: 0,
        borderTop: "0px solid transparent",
        borderLeft: gender === "F" ? "80px solid pink" : "80px solid lightblue",
        borderBottom: "80px solid transparent",
        float: "left",
        zIndex: 5,
        position: "absolute",
        filter: "drop-shadow(2px 3px 3px grey)"
    }
    return (<div style={style}></div>);
  }

  render() {
    console.log(this.post, this.post.mediaMeta, this.post.mediaMeta[0])
    return (
    <div className="post">
        {this.addGender(this.post.gender)}
        <Paper style={{ marginBottom: "10px", padding: "20px" }}>
            <Grid container>
                <Grid item sm={3}>
                    <div style={{ height: "130px", overflow: "hidden"}}>
                        <img style={{ maxWidth: "150px" }} src={this.post.mediaMeta[0]?.thumbnail}></img>
                    </div>
                </Grid>
                <Grid item sm={9} container>
                    <Grid item>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>{this.post.title}</span>
                    </Grid>
                    <Grid item>
                        <span style={{ color: "grey" }}>{this.post.excerpt}</span>
                    </Grid>
                    <Grid item>
                        <Grid item container spacing={2}>
                            {this.genReactions(this.post.reactions)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
    );
  }
}


import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import React from 'react';

export class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.post = this.props.post;
  }

  genReactions(reactions) {
        let emojis = {
            "286f599c-f86a-4932-82f0-f5a06f1eca03": "❤️",
            "011ead16-9b83-4729-9fde-c588920c6c2d": "🤩",
            "4b018f48-e184-445f-adf1-fc8e04ba09b9": "😮",
            "aa0d425f-d530-4478-9a77-fe3aedc79eea": "😡",
            "e8e6bc5d-41b0-4129-b134-97507523d7ff": "😂",
            "514c2569-fd53-4d9d-a415-bf0f88e7329f": "😭"
        };
      return reactions.map((reaction, index) => {
            return (<Grid item key={index}>
                <Grid container spacing={1}>
                    <Grid item>{emojis[reaction.id]}</Grid>
                    <Grid item>{reaction.count}</Grid>
                </Grid>
            </Grid>);
      });
  }

  addGender(gender) {
    let style = {
        height: "140px",
        borderLeft: gender === "F" ? "10px solid pink" : "10px solid lightblue",
        float: "left",
        zIndex: 5,
        position: "absolute"
    }
    return (<div style={style}></div>);
  }

  render() {
    console.log(this.post, this.post.mediaMeta, this.post.mediaMeta[0])
    return (
    <div className="post">
        {this.addGender(this.post.gender)}
        <Paper style={{ marginBottom: "10px", padding: "20px" }}>
            <Grid container spacing={1}>
                <Grid item sm={3}>
                    <div style={{ height: "100px", overflow: "hidden"}}>
                        <img style={{ maxWidth: "150px", display: "block", margin: "0 auto" }} src={this.post.mediaMeta[0]?.thumbnail}></img>
                    </div>
                </Grid>
                <Grid item sm={9} container>
                    <Grid item container wrap="nowrap">
                        <Grid item sm={10} zeroMinWidth>
                            <Typography style={{ fontSize: "20px", fontWeight: "bold" }} noWrap>{this.post.title}</Typography>
                        </Grid>
                        <Grid item sm={2} style={{ textAlign: "right" }}>
                            <Chip size="small" label={this.post.forumName} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography style={{ color: "grey", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "2", overflow: "hidden" }}>{this.post.excerpt}</Typography>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item>💬</Grid>
                                <Grid item>{this.post.commentCount}</Grid>
                            </Grid>
                        </Grid>
                        {this.genReactions(this.post.reactions)}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
    );
  }
}


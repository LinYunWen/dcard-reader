import React from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '../scss/card.scss';

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
    return (<div className={`gender-bar${gender === "F" ? " pink" : " lightblue"}`}></div>);
  }

  render() {
    // console.log(this.post, this.post.mediaMeta, this.post.mediaMeta[0])
    return (
    <div className="post">
        {this.addGender(this.post.gender)}
        <Paper className="card-paper">
            <Grid container spacing={1}>
                <Grid item sm={3} className="card-image">
                    <div>
                        <img src={this.post.mediaMeta[0]? this.post.mediaMeta[0].thumbnail : "https://yt3.ggpht.com/ytc/AAUvwng2t8wqSwB7wanFnBDKyakK8k5Bbj2A1KXfnZo7=s88-c-k-c0x00ffffff-no-rj"}></img>
                    </div>
                </Grid>
                <Grid item sm={9} container>
                    <Grid item container wrap="nowrap">
                        <Grid item sm={10} zeroMinWidth>
                            <Typography className="card-title bold" noWrap>{this.post.title}</Typography>
                        </Grid>
                        <Grid item sm={2} className="card-tag">
                            <Chip size="small" label={this.post.forumName} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className="card-excerpt">{this.post.excerpt}</Typography>
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


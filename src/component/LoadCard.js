import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import '../scss/card.scss';

export class LoadCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Paper className="card-paper" id={this.props.lastCard ? "last-card" : ""}>
            <Grid container spacing={1}>
                <Grid item sm={3} className="height-140">
                  <Skeleton animation={"wave"} variant="rect" height="100%" />
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
    );
    }
}


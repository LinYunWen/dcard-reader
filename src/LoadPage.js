import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

export class LoadPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
      );
    }
}


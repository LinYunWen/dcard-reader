import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';

export class WarnAndErrorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let type = this.props.type;
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
                        {type === "error" ?
                            <CancelIcon style={{ fontSize: 100, color: "red" }} /> :
                            <WarningIcon style={{ fontSize: 100, color: "yellow" }} />
                        }
                    </div>
                </Grid>
                <Grid item sm={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant={"h4"} style={{ color: "red", lineHeight: "unset" }}>
                    {type === "error" ? "There are something wrong. Please check your network and try again." : "There is no post."}
                </Typography>
                </Grid>
                <Grid item sm={1}></Grid>
            </Grid>
            </Container>
        </React.Fragment>
    );
  }
}


import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
import './app.scss';
import './base.scss';

export class WarnAndErrorPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let type = this.props.type;
    return (
        <Grid container spacing={2} style={{ position: "absolute", top: "40vh" }}>
            <Grid item sm={1}></Grid>
            <Grid item sm={2}>
                <div className="center-icon">
                    {type === "error" ?
                        <CancelIcon className="red" style={{ fontSize: "100px" }} /> :
                        <WarningIcon className="yellow" style={{ fontSize: "100px" }} />
                    }
                </div>
            </Grid>
            <Grid item sm={8} className="center-text">
                <Typography variant={"h4"} className={`unset-line-height${type === "error" ? " red" : " yellow"}`}>
                    {type === "error" ? "There are something wrong. Please check your network and try again." : "There is no post."}
                </Typography>
            </Grid>
            <Grid item sm={1}></Grid>
        </Grid>
    );
  }
}


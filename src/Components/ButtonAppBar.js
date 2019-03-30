import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexDirection: "row",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    /*<Router> */
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <Link to="/profile"> */}
            <Button variant="h6" color="inherit" className={classes.grow}>
              Profile
            </Button>
          {/* </Link> */}
          {/* <Link to="/form"> */}
          <Button variant="h6" color="inherit" className={classes.grow}>
            Form
          </Button>
          {/* </Link> */}
          {/* <Link to="visualization"> */}
          <Button variant="h6" color="inherit" className={classes.grow}>
            Visualization
          </Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </div>
    /* <Route path="/profile" component={Profile} /> */
    /* <Route path="/form" component={Form} /> */
    /* <Route path="/visualization" component={Visualization}/> */
    /* </Router> */
  );
}

function Profile() {
  return (
    <div>
      Profile
    </div>
  )
}
function Form() {
  return (
    <div>
      Form
    </div>
  )
}

function Visualization() {
  return (
    <div>
      Visualization
    </div>
  )
}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);

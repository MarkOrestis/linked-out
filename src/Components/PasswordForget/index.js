import React, { Component } from 'react';
import {Link as Wow}   from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from 'firebase';
import { withStyles, Typography } from '@material-ui/core';


const PasswordForgetPage = () => (
  <div>
    <Typography style={{fontSize: '22px'}}>Password Forget</Typography>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.email)
  };

  render() {
    const { email, error } = this.state;
    const { classes } = this.props;
    const isInvalid = this.state.email === '';

    return (
      <form onSubmit={this.onSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="email"
          name="email"
          label="Email Address"
          className={classes.textField}
          onChange={this.onChange}
          margin="normal"
        />
        <Button className={classes.button} disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <div>
    <Wow to={ROUTES.PASSWORD_FORGET}>    
      <Link  style={ linkStyle } component="button" variant="body2">Forgot Password?</Link>
    </Wow>
  </div>
);
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: '20px'
  }
});

export const linkStyle = {
  margin: '5px auto',
  width: '100%'

}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(withStyles(styles)(PasswordForgetFormBase));

export { PasswordForgetForm, PasswordForgetLink };
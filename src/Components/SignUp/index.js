import React, { Component } from 'react';
import { Link as Wow, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { linkStyle } from '../PasswordForget/index'


import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link'


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);

      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
              <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
         <button disabled={isInvalid} type="submit">
         Sign Up
         </button>

        {error && <p>{error.message}</p>}

      </form>
    );
  }
}

const SignUpLink = () => (
  <div style={moreLinks}>
    <Typography inline variant="body2" gutterBottom>
    Don't have an account?</Typography>
    <Wow to={ROUTES.SIGN_UP}>
      <Link component="button" variant="body2">Sign Up</Link>
    </Wow>
  </div>    
);

const moreLinks = {
  margin: '0 45%'
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
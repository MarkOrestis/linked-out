import React, { Component } from 'react';
import { Link as Wow, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
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
  major: '',
  company: '',
  graduationYear: '',
  GPA: '',
  City: '',
  State: '',
  salary: '',
  position: '',
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
    console.log(this.state.salary);
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

    const { classes } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Registration Form
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="passwordOne"
                    type="password"
                    name="passwordOne"
                    label="Password"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="passwordTwo"
                    type="password"
                    name="passwordTwo"
                    label="Confirm Password"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="major"
                    name="major"
                    label="Major"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="gpa"
                    name="gpa"
                    label="GPA"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="company"
                    name="company"
                    label="Company"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="salary"
                    name="salary"
                    label="Salary"
                    fullWidth
                    onChange={this.onChange}
                  />
                </Grid>
                <Button
                type="submit"
                disabled={isInvalid}
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
              >
                Register
              </Button>
              {error && <p>{error.message}</p>}
              </Grid>
            </React.Fragment>
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


const styles = theme => ({
  submit: {
    marginLeft: '45%',
    marginRight: '45%',
    marginTop: theme.spacing.unit * 3,
  },

});
const moreLinks = {
  margin: '0 45%'
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default withStyles(styles)(SignUpPage);

export { SignUpForm, SignUpLink };
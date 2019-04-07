import React, { Component } from 'react';
import { Link as Wow, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';





import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link'


const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  fname: '',
  lname: '',
  passwordOne: '',
  passwordTwo: '',
  major: '',
  company: '',
  gradYear: '',
  gpa: '',
  city: '',
  state: '',
  salary: '',
  title: '',
  linkedInURL: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    console.log(this.state);
    const { username, email, passwordOne, major, company, gradYear,
      gpa, city, state, salary, title, linkedInURL, fname, lname
    } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            fname,
            lname,
            email,
            major,
            company,
            city,
            state,
            gradYear,
            gpa,
            salary,
            title,
            linkedInURL
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
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      fname,
      lname,
      error,
      major,
      city,
      state,
      title,
      company,
      linkedInURL,
      gradYear,
      gpa,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      fname === '' ||
      lname === '' ||
      email === '' ||
      username === '' ||
      major === '' ||
      city === '' ||
      state === '' ||
      title === '' ||
      company === '' ||
      gradYear === '' ||
      linkedInURL === '' ||
      gpa === '';

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
              id="fname"
              name="fname"
              label="First Name"
              fullWidth
              autoComplete="fname"
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lname"
              name="lname"
              label="Last Name"
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
            <TextField required id="state" name="state" label="State/Province/Region" fullWidth onChange={this.onChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              select
              id="major"
              name="major"
              label="Major"
              fullWidth
              value={major}
              label="Major"
              onChange={this.onChange}
            >
              <option value='CS'>
                CS
              </option>
              <option value='ME'>
                ME
              </option>
              <option value='AE'>
                AE
              </option>
              <option value='IE'>
                IE
              </option>
              <option value='BA'>
                BA
              </option>
            </TextField>

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              select
              label="Select"
              // className={classes.textField}
              id="gpa"
              name="gpa"
              label="GPA"
              fullWidth
              value={this.state.gpa}
              onChange={this.onChange}
              // SelectProps={{
              //   MenuProps: {
              //     className: classes.menu,
              //   },
              // }}
            >
              <option value='3.5 to 4.0'>
                  3.5 to 4.0
                </option>
              <option value='3.0 to 3.5'>
                3.0 to 3.5
              </option>
              <option value='2.5 to 3.0'>
                2.5 to 3.0
              </option>
              <option value='2.0 to 2.5'>
                2.0 to 2.5
              </option>
              <option value='Below 2.0'>
                Below 2.0
              </option>
            </TextField>
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
              id="title"
              name="title"
              label="Work Title"
              fullWidth
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              select
              label="Select"
              id="salary"
              name="salary"
              label="Salary"
              fullWidth
              value={this.state.salary}
              onChange={this.onChange}
        
            >
              <option value='$150k+'>
                  $150k+
                </option>
              <option value='$125k to $150k'>
              $125k to $150k
              </option>
              <option value='$100k to $125k'>
                $100k to $125k
              </option>
              <option value='$90k to $100k'>
                $90k to $100k
              </option>
              <option value='$80k to $90k'>
                $80k to $90k
              </option>
              <option value='< $80k'>
                Less than $80k
              </option>
            </TextField>
            
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="gradYear"
              name="gradYear"
              label="Graduation Year"
              fullWidth
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="linkedInURL"
              name="linkedInURL"
              label="LinkedIn URL"
              fullWidth
              onChange={this.onChange}
            />
          </Grid>
          <Button
            type="submit"
            disabled={isInvalid}
            style={moreLinks}
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
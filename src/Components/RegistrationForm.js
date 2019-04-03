import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    submit: {
      marginLeft: '45%',
      marginRight: '45%',
      marginTop: theme.spacing.unit * 3,
    },
  });

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
  
        this.state={
            username: "",
            fname: "",
            lname: "",
            email: "",
            password: "",
            city: "",
            state: "",
            major: "",
            gpa: "",
            company: "",
            salary: ""
        };
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    submitForm = event => {
        //this.state contains the different info the user inputted after clicking the button
        console.log('major ' + this.state.major);
    }

    render() {
        const { classes } = this.props;
        const { username } = this.state;
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
                    value={username}
                    name="username"
                    label="Username"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    type="password"
                    name="password"
                    label="Confirm Password"
                    fullWidth
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="gpa"
                    name="gpa"
                    label="GPA"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="company"
                    name="company"
                    label="Company"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="salary"
                    name="salary"
                    label="Salary"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.submitForm}
              >
                Register
              </Button>
              </Grid>
            </React.Fragment>
          );
    }
}

export default withStyles(styles)(RegistrationForm);
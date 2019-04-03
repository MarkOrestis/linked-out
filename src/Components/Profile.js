import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MailIcon from '@material-ui/icons/MailOutline';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
	avatar: {
		marginTop: theme.spacing.unit * 5,
		marginBottom: theme.spacing.unit * 5,
		width: 150,
		height: 150,
	},

	toolbar: {
		marginTop: theme.spacing.unit * 3,
	},

	basicInfo: {
		marginTop: theme.spacing.unit * 3,
	},

	contactButton: {
		margin: theme.spacing.unit,
	},

	mailIcon: {
    	marginLeft: theme.spacing.unit,
  	},

  	link: {
    	margin: theme.spacing.unit,
  	},

  	educationCard: {
  		minWidth: 275,
  	},

  	cardTitle: {
  		fontSize: 14,
  	},
});

function BasicInfoContainer(props) {
	//let { classes1 } = props;
  	return (
  		<div /*className={classes1.basicInfo}*/>
    		<Typography variant="h4" style={{ padding: '25px 0px 25px 25px' }}>
      			Basic Information
    		</Typography>
    		<Typography variant="body1" style={{ padding: '0px 0px 0px 25px'}}>
    			LinkedIn Profile:
    			<Link href={'https://www.linkedin.com'} style={{ padding: '0px 0px 0px 5px'}}>
    				{'View [User] Profile'}
    			</Link>
    		</Typography>
   		</div>
  	);
}

function EducationContainer(props) {
  return (
    <div>
		<Typography variant="h4" style={{ padding: '25px 0px 15px 25px' }}>
  			Undergraduate Education
		</Typography>
		<Card style={{ maxWidth: 500, margin: '0px 0px 25px 25px' }}>
			<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '10px 0px 0px 15px'}}>
          		School
        	</Typography>
        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
				Georgia Institute of Technology
        	</Typography>
			<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '0px 0px 0px 15px'}}>
          		Graduation Year
        	</Typography>
        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
				[User's grad year]
        	</Typography>
        	<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '0px 0px 0px 15px'}}>
          		Major
        	</Typography>
        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
				[User's major]
        	</Typography>
		</Card>
   	</div>
  );
}

function WorkContainer(props) {
	const data = [
		{"company":"Amazon", "title":"Software Engineer", "time":"2018"},
		{"company":"Google", "title":"Product Manager", "time":"2017"}
	];
  	return (
    <div>
		<Typography variant="h4" style={{ padding: '25px 0px 15px 25px' }}>
  			Work Experience
		</Typography>
		<Grid container spacing={40} style={{ padding: '0px 0px 0px 25px' }}>
			{data.map(work => (
				<Grid item key={work.company}>
					<Card>
						<div>
							<CardContent>
								<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '10px 0px 0px 15px'}}>
					          		Company
					        	</Typography>
					        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
									{work.company}
					        	</Typography>
								<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '0px 0px 0px 15px'}}>
					          		Title
					        	</Typography>
					        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
									{work.title}
								</Typography>
					        	<Typography color="textSecondary" gutterBottom style={{ fontSize: 14, padding: '0px 0px 0px 15px'}}>
					          		Time
					        	</Typography>
					        	<Typography variant="h5" component="h2" style={{ padding: '0px 0px 10px 15px'}}>
									{work.time}
					        	</Typography>
							</CardContent>
						</div>
					</Card>
				</Grid>
			))}
		</Grid>
   	</div>
  );
}

class Profile extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};
	
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center" direction="column">
					<Avatar src="../images/dog.png" className={classes.avatar} />
					<Typography variant="h2" align="center">User Name</Typography>
					<Button variant="outlined" color="primary" className={classes.contactButton}>
						Contact
						<MailIcon className={classes.mailIcon}></MailIcon>
					</Button>
				</Grid>
				<AppBar position="static" className={classes.toolbar}>
		          <Tabs value={this.state.value} onChange={this.handleChange} centered >
		            <Tab label="Basic Information" />
		            <Tab label="Education" />
		            <Tab label="Work" />
		          </Tabs>
		        </AppBar>
		        {this.state.value === 0 && <BasicInfoContainer>User info woo</BasicInfoContainer>}
        		{this.state.value === 1 && <EducationContainer>Education woo</EducationContainer>}
        		{this.state.value === 2 && <WorkContainer>Work experience woo</WorkContainer>}
		    </div>
		);
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);

/*
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function ProfilePic(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
		</div>
	)
}

class ProfileTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="About" />
            <Tab label="Connections" />
            <Tab label="Contact" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTabs);
*/
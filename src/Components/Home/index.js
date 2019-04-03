import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProfileIcon from '@material-ui/icons/Person';
import FriendsIcon from '@material-ui/icons/People';
import FilterIcon from '@material-ui/icons/FilterList';
import AllIcon from '@material-ui/icons/FormatAlignJustify';
import Profile from './Profile';
import Visualization from './Visualization';

import { withAuthorization } from '../Session';

const drawerWidth = 240;

const mainSectionItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<ProfileIcon />
			</ListItemIcon>
			<ListItemText primary="Profile" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<FriendsIcon />
			</ListItemIcon>
			<ListItemText primary="Friends" />
		</ListItem>
	</div>
);

const secondarySectionItems = (
	<div>
		<ListSubheader inset>Viz Actions?</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AllIcon />
			</ListItemIcon>
			<ListItemText primary="All" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<FilterIcon />
			</ListItemIcon>
			<ListItemText primary="By Year" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<FilterIcon />
			</ListItemIcon>
			<ListItemText primary="By Major" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<FilterIcon />
			</ListItemIcon>
			<ListItemText primary="By GPA" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<FilterIcon />
			</ListItemIcon>
			<ListItemText primary="By Company" />
		</ListItem>
	</div>
);

const styles = theme => ({
	root: {
		display: 'flex',
	},

	toolbar: {
		paddingRight: 24,
	}, 

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
    	transition: theme.transitions.create(['width', 'margin'], {
      	easing: theme.transitions.easing.sharp,
      	duration: theme.transitions.duration.leavingScreen,
    	}),
	}, 

	appBarShift: {
		marginLeft: drawerWidth,
    	width: `calc(100% - ${drawerWidth}px)`,
    	transition: theme.transitions.create(['width', 'margin'], {
      	easing: theme.transitions.easing.sharp,
      	duration: theme.transitions.duration.enteringScreen,
    	}),
	},

	appBarSpacer: theme.mixins.toolbar,
  	
  	content: {
	    flexGrow: 1,
	    padding: theme.spacing.unit * 3,
	    height: '100vh',
	    overflow: 'auto',
	},

	menuButton: {
    	marginLeft: 12,
    	marginRight: 36,
  	},

  	menuButtonHidden: {
  		display: 'none',
  	},

  	title: {
  		flexGrow: 1,
  	},

  	drawerPaper: {
	    position: 'relative',
	    whiteSpace: 'nowrap',
	    width: drawerWidth,
	    transition: theme.transitions.create('width', {
	      	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.enteringScreen,
    	}),
  	},

	drawerPaperClose: {
	    overflowX: 'hidden',
	    transition: theme.transitions.create('width', {
	      	easing: theme.transitions.easing.sharp,
	      	duration: theme.transitions.duration.leavingScreen,
	    }),
	    width: theme.spacing.unit * 7,
	   		[theme.breakpoints.up('sm')]: {
	      		width: theme.spacing.unit * 9,
	    	},
	},

	toolbarIcon: {
		display: 'flex',
    	alignItems: 'center',
    	justifyContent: 'flex-end',
    	padding: '0 8px',
    	...theme.mixins.toolbar,
	}, 

	contentContainer: {
    	marginLeft: -22,
  	},
});

class Dashboard extends React.Component {
	state = {
		drawerOpen : true,
		selectedIndex : 0,
		showProfile : false,
		showViz : true,
	};

	handleDrawerOpen = () => {
		this.setState({
			drawerOpen : true,
		});
	};

	handleDrawerClose = () => {
		this.setState({
			drawerOpen : false,
		});
	};

	handleListItemClick = (event, index) => {
		this.setState({selectedIndex : index}, () => {
			if (this.state.selectedIndex == 0) {
				console.log("Dashboard selected");
				this.setState({
					showProfile : false,
					showViz : true,
				});
			} else if (this.state.selectedIndex == 1) {
				console.log("Profile selected");
				this.setState({
					showProfile : true,
					showViz : false,
				});
			} else if (this.state.selectedIndex == 2) {
				console.log("Friends selected");
			}
		});
		// if (this.state.selectedIndex == 0) {
		// 	console.log("Dashboard selected");
		// } else if (this.state.selectedIndex == 1) {
		// 	console.log("Profile selected");
		// } else if (this.state.selectedIndex == 2) {
		// 	console.log("Friends selected");
		// }
	}

	// handleProfileClick = () => {
	// 	this.setState
	// }

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="absolute" className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}>
					<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
						<IconButton color="inherit" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
						<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose)}} open={this.state.open}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					{/*<List>{mainSectionItems}</List>*/}
					<List>
						<ListItem
							button
							selected={this.state.selectedIndex === 0}
							onClick={event => this.handleListItemClick(event, 0)}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItem>
						<ListItem
							button
							selected={this.state.selectedIndex === 1}
							onClick={event => this.handleListItemClick(event, 1)}>
							<ListItemIcon>
								<ProfileIcon />
							</ListItemIcon>
							<ListItemText primary="Profile" />
						</ListItem>
						<ListItem
							button
							selected={this.state.selectedIndex === 2}
							onClick={event => this.handleListItemClick(event, 2)}>
							<ListItemIcon>
								<FriendsIcon />
							</ListItemIcon>
							<ListItemText primary="Friends" />
						</ListItem>
					</List>
					<Divider />
					<List>{secondarySectionItems}</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Typography component="div" className={classes.contentContainer}>
						{this.state.showViz ? <Visualization /> : null}
			            {this.state.showProfile ? <Profile /> : null}
			        </Typography>
				</main>
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);
export default withStyles(styles)(Dashboard);


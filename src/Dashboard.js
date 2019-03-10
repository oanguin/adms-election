import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Settings from './Settings';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Question5 from './Question5';
import Question6 from './Question6';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppScss from './App.scss';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
    currentMenuItem: 1,
    active: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleOnMenuItemClick = (event) => {
    var menuItem = event.target.parentElement.getAttribute("data-index") ? event.target.parentElement : event.target;
    const currentMenuItem = parseInt(menuItem.getAttribute("data-index"));

    this.setState({currentMenuItem:currentMenuItem })
  };

  setActiveStatus = (active) =>{
    console.log('Setting State', active)
    this.setState({active:active});
  }

  render() {
    const { classes } = this.props;
    var SettingsClass = classNames({
        'visible': this.state.currentMenuItem === 1,
        'hidden': this.state.currentMenuItem !== 1
      });
    var Question1Class = classNames({
        'visible': this.state.currentMenuItem === 2,
        'hidden': this.state.currentMenuItem !== 2
      });
    var Question2Class = classNames({
        'visible': this.state.currentMenuItem === 3,
        'hidden': this.state.currentMenuItem !== 3
      });
    var Question3Class = classNames({
        'visible': this.state.currentMenuItem === 4,
        'hidden': this.state.currentMenuItem !== 4
      });
    var Question4Class = classNames({
        'visible': this.state.currentMenuItem === 5,
        'hidden': this.state.currentMenuItem !== 5
      });
    var Question5Class = classNames({
        'visible': this.state.currentMenuItem === 6,
        'hidden': this.state.currentMenuItem !== 6
      });
    var Question6Class = classNames({
        'visible': this.state.currentMenuItem === 7,
        'hidden': this.state.currentMenuItem !== 7
      });
    var Progress = classNames({
        'visible': this.state.active,
        'hidden': !this.state.active,
        'progress-bar': true
      });
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Advance Data Management - Course Work 4 - <i>By: Oneal Anguin</i>
              <div className={Progress}>
                <CircularProgress className={Progress} />
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List onClick={this.handleOnMenuItemClick}>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={SettingsClass}>
                <Settings className={classes.content} Neo4JUrl={"bolt://localhost:7687"} User={"neo4j"} Password={"neo4jpass"}/>
          </div>
          <div className={Question1Class}>
            <Question1 setActiveStatus={this.setActiveStatus}/>
          </div>
          <div className={Question2Class}>
            <Question2 setActiveStatus={this.setActiveStatus}/>
          </div>
          <div className={Question3Class}>
            <Question3 setActiveStatus={this.setActiveStatus}/>
          </div>
          <div className={Question4Class}>
            <Question4 setActiveStatus={this.setActiveStatus}/>
          </div>
          <div className={Question5Class}>
            <Question5 setActiveStatus={this.setActiveStatus}/>
          </div>
          <div className={Question6Class}>
            <Question6 setActiveStatus={this.setActiveStatus}/>
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
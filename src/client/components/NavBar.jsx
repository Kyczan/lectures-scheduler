import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

function NavBar(props) {
  const { classes, buttonsData } = props;
  const IconButtons = buttonsData.map(btn => (
    <IconButton
      key={btn.link}
      component={NavLink}
      to={btn.link}
      exact
      activeClassName="active-route"
      color="inherit"
      aria-label={btn.label}
    >
      {btn.icon}
    </IconButton>
  ));
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Planer
          </Typography>
          {IconButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonsData: PropTypes.array.isRequired
};

export default withStyles(styles)(NavBar);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SpeakersIcon from '@material-ui/icons/Contacts';
import CalendarIcon from '@material-ui/icons/EventNote';
import LecturesIcon from '@material-ui/icons/FileCopy';
import CongregationsIcon from '@material-ui/icons/Public';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Plan
          </Typography>
          <IconButton color="inherit" aria-label="Plan">
            <CalendarIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Speakers">
            <SpeakersIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Lectures">
            <LecturesIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Congregations">
            <CongregationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
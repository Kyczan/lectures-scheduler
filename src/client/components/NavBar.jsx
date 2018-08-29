import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
  Contacts as SpeakersIcon,
  EventNote as CalendarIcon,
  FileCopy as LecturesIcon,
  Public as CongregationsIcon
} from '@material-ui/icons';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  linkPurifier: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Planer
          </Typography>
          <Link className={classes.linkPurifier} to={'/'}>
            <IconButton color="inherit" aria-label="Plan">
              <CalendarIcon />
            </IconButton>
          </Link>
          <Link className={classes.linkPurifier} to={'/speakers'}>
            <IconButton color="inherit" aria-label="Speakers">
              <SpeakersIcon />
            </IconButton>
          </Link>
          <Link className={classes.linkPurifier} to={'/lectures'}>
            <IconButton color="inherit" aria-label="Lectures">
              <LecturesIcon />
            </IconButton>
          </Link>
          <Link className={classes.linkPurifier} to={'/congregations'}>
            <IconButton color="inherit" aria-label="Congregations">
              <CongregationsIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Planer
          </Typography>

          <IconButton
            component={NavLink}
            to={'/'}
            exact
            activeClassName="active-route"
            color="inherit"
            aria-label="Plan"
          >
            <CalendarIcon />
          </IconButton>

          <IconButton
            component={NavLink}
            to={'/speakers'}
            exact
            activeClassName="active-route"
            color="inherit"
            aria-label="Mówcy"
          >
            <SpeakersIcon />
          </IconButton>

          <IconButton
            component={NavLink}
            to={'/lectures'}
            exact
            activeClassName="active-route"
            color="inherit"
            aria-label="Wykłady"
          >
            <LecturesIcon />
          </IconButton>

          <IconButton
            component={NavLink}
            to={'/congregations'}
            exact
            activeClassName="active-route"
            color="inherit"
            aria-label="Zbory"
          >
            <CongregationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);

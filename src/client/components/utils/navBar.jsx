import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

function NavBar(props) {
  const { buttonsData } = props;
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
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="title" color="inherit" className="toolbar-title">
          Planer
        </Typography>
        {IconButtons}
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  buttonsData: PropTypes.array.isRequired
};

export default NavBar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreVert';
import SortIcon from '@material-ui/icons/Sort';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteIcon: {
    position: 'absolute',
    display: 'flex',
    right: '3px',
    top: '6px',
    '&:hover': {
      cursor: 'pointer'
    },
  },
  searchAdornment: {
    marginLeft: '28px'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchInputValue: ''
  };

  handleSortMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSortMenuClose = () => {
    this.setState({ anchorEl: null });
  };


  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleSearchChange = e => {
    this.setState({
      searchInputValue: e.target.value
    }, this.props.onFilter(e.target.value));
  }

  resetSearch = () => {
    this.setState({
      searchInputValue: ''
    }, this.props.onFilter(''));
  }

  handleSort = () => {
    this.handleSortMenuClose();
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, buttonsData } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    const IconButtonsMobile = buttonsData.map(btn => (
      <MenuItem
        key={btn.link}
        component={NavLink}
        activeClassName="active-route"
        exact
        to={btn.link}
        onClick={this.handleMobileMenuClose}
      >
        <IconButton color="inherit" aria-label={btn.label}>
          {btn.icon}
        </IconButton>
        <p>{btn.label}</p>
      </MenuItem>
    ));

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {IconButtonsMobile}
      </Menu>
    );

    const renderSortMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleSortMenuClose}
      >
        <MenuItem onClick={this.handleSort}>Rosnąco</MenuItem>
        <MenuItem onClick={this.handleSort}>Malejąco</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap
            >
              Planer
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <DebounceInput
                element={Input}
                disableUnderline
                value={this.state.searchInputValue}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                minLength={2}
                debounceTimeout={300}
                onChange={this.handleSearchChange}
                endAdornment={
                  <InputAdornment position="end" className={classes.searchAdornment}>
                    <div 
                      className={classes.deleteIcon}
                      onClick={this.resetSearch}
                    >
                      {this.state.searchInputValue ? <DeleteIcon /> : null}
                    </div>
                  </InputAdornment>
                }
              />
            </div>
            <IconButton
              onClick={this.handleSortMenuOpen}
              color="inherit"
            >
              <SortIcon />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>{IconButtons}</div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderSortMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

NavBar.propTypes = {
  buttonsData: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);

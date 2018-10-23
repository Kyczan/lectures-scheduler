import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SpeakersIcon from '@material-ui/icons/SupervisorAccount';
import CongregationsIcon from '@material-ui/icons/Public';

class CongregationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMoreClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMoreClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCongregationDelete = () => {
    this.handleMoreClose();
    this.props.onDelete();
  };

  handleCongregationUpdate = () => {
    this.handleMoreClose();
    this.props.onUpdate();
  };

  render() {
    const { congregation } = this.props;
    const { anchorEl } = this.state;

    const number = congregation.number ? (
      <ListItem className="list-item">
        <Avatar>
          <CongregationsIcon />
        </Avatar>
        <ListItemText primary={congregation.number} secondary="Numer zboru" />
      </ListItem>
    ) : null;
    const speakers_count = congregation.speakers_count ? (
      <ListItem className="list-item">
        <Avatar>
          <SpeakersIcon />
        </Avatar>
        <ListItemText
          primary={congregation.speakers_count}
          secondary="Mówców"
        />
      </ListItem>
    ) : null;

    return (
      <Card className="card">
        <CardHeader
          className="card-header"
          action={
            <div>
              <IconButton aria-label="Więcej" onClick={this.handleMoreClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="side-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMoreClose}
              >
                <MenuItem onClick={this.handleCongregationUpdate}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edytuj" />
                </MenuItem>
                <MenuItem onClick={this.handleCongregationDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuń" />
                </MenuItem>
              </Menu>
            </div>
          }
          title={congregation.name}
        />
        <CardContent className="card-content">
          <List>
            {number}
            {speakers_count}
          </List>
        </CardContent>
      </Card>
    );
  }
}

CongregationCard.propTypes = {
  congregation: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default CongregationCard;

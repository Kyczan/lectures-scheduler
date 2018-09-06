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
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Assignment as TitleIcon,
  Person as SpeakerIcon,
  Public as CongregationsIcon,
  Notes as NotesIcon
} from '@material-ui/icons';

class EventCard extends Component {
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

  handleEventDelete = () => {
    this.handleMoreClose();
    this.props.onDelete();
  };

  handleEventUpdate = () => {
    this.handleMoreClose();
    this.props.onUpdate();
  };

  render() {
    const { event } = this.props;
    const { anchorEl } = this.state;

    const lecture = event.lecture ? (
      <ListItem className="list-item">
        <Avatar>
          <TitleIcon />
        </Avatar>
        <ListItemText primary={event.lecture} secondary="Temat" />
      </ListItem>
    ) : null;
    const speaker = event.speaker ? (
      <ListItem className="list-item">
        <Avatar>
          <SpeakerIcon />
        </Avatar>
        <ListItemText primary={event.speaker} secondary="Mówca" />
      </ListItem>
    ) : null;
    const congregation = event.congregation ? (
      <ListItem className="list-item">
        <Avatar>
          <CongregationsIcon />
        </Avatar>
        <ListItemText primary={event.congregation} secondary="Zbór" />
      </ListItem>
    ) : null;
    const notes = event.note ? (
      <ListItem className="list-item">
        <Avatar>
          <NotesIcon />
        </Avatar>
        <ListItemText primary={event.note} secondary="Uwagi" />
      </ListItem>
    ) : null;

    return (
      <Card className="card">
        <CardHeader
          className="card-header"
          action={
            <div>
              <IconButton
                aria-label="Więcej"
                aria-owns={open ? 'side-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMoreClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="side-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMoreClose}
              >
                <MenuItem onClick={this.handleEventUpdate}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edytuj" />
                </MenuItem>
                <MenuItem onClick={this.handleEventDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuń" />
                </MenuItem>
              </Menu>
            </div>
          }
          title={event.event_date}
          subheader={event.event_time}
        />
        <CardContent className="card-content">
          <List>
            {lecture}
            {speaker}
            {congregation}
            {notes}
          </List>
        </CardContent>
      </Card>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EventCard;

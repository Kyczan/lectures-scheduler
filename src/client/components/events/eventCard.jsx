import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import TitleIcon from '@material-ui/icons/Assignment';
import SpeakerIcon from '@material-ui/icons/Person';
import NotesIcon from '@material-ui/icons/Notes';

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
    const eventDate = moment(event.event_date).format('D MMMM YYYY');

    const lecture = event.lecture ? (
      <ListItem className="list-item">
        <Avatar>
          <TitleIcon />
        </Avatar>
        <ListItemText primary={event.lecture} />
      </ListItem>
    ) : null;
    const congregation = event.congregation ? event.congregation : '';
    const speaker = event.speaker ? (
      <ListItem className="list-item">
        <Avatar>
          <SpeakerIcon />
        </Avatar>
        <ListItemText primary={event.speaker} secondary={congregation} />
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
          title={eventDate}
          subheader={event.event_time}
        />
        <CardContent className="card-content">
          <List>
            {lecture}
            {speaker}
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

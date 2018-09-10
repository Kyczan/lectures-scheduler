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
import LastLectureIcon from '@material-ui/icons/History';
import LastSpeakerIcon from '@material-ui/icons/Person';

class LectureCard extends Component {
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

  handleLectureDelete = () => {
    this.handleMoreClose();
    this.props.onDelete();
  };

  handleLectureUpdate = () => {
    this.handleMoreClose();
    this.props.onUpdate();
  };

  render() {
    const { lecture } = this.props;
    const { anchorEl } = this.state;
    const notes = lecture.notes ? lecture.notes.split('##') : [];

    const title = lecture.title ? (
      <ListItem className="list-item">
        <Avatar>
          <TitleIcon />
        </Avatar>
        <ListItemText primary={lecture.title} secondary="Tytuł" />
      </ListItem>
    ) : null;
    const lastTime = notes[0] ? (
      <ListItem className="list-item">
        <Avatar>
          <LastLectureIcon />
        </Avatar>
        <ListItemText primary={moment(notes[0]).format('D MMMM YYYY')} secondary="Ostatnie wygłoszenie" />
      </ListItem>
    ) : null;
    const lastSpeaker = notes[1] ? (
      <ListItem className="list-item">
        <Avatar>
          <LastSpeakerIcon />
        </Avatar>
        <ListItemText primary={notes[1]} secondary="Ostatni mówca" />
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
                <MenuItem onClick={this.handleLectureUpdate}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edytuj" />
                </MenuItem>
                <MenuItem onClick={this.handleLectureDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuń" />
                </MenuItem>
              </Menu>
            </div>
          }
          title={lecture.number}
        />
        <CardContent className="card-content">
          <List>
            {title}
            {lastTime}
            {lastSpeaker}
          </List>
        </CardContent>
      </Card>
    );
  }
}

LectureCard.propTypes = {
  lecture: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default LectureCard;

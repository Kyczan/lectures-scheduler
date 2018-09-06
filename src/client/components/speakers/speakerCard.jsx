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
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as PrivilegeIcon,
  Notes as NotesIcon,
  History as LastLectureIcon,
  Public as CongregationsIcon
} from '@material-ui/icons';

class SpeakerCard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleMoreClick = speaker => {
    this.setState({ anchorEl: speaker.currentTarget });
  };

  handleMoreClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSpeakerDelete = () => {
    this.handleMoreClose();
    this.props.onDelete();
  };

  handleSpeakerUpdate = () => {
    this.handleMoreClose();
    this.props.onUpdate();
  };

  render() {
    const { speaker } = this.props;
    const { anchorEl } = this.state;
    const congregation = speaker.congregation ? (
      <ListItem className="list-item">
        <Avatar>
          <CongregationsIcon />
        </Avatar>
        <ListItemText primary={speaker.congregation} secondary="Zbór" />
      </ListItem>
    ) : null;
    const privilege =
      speaker.privilege && speaker.privilege !== '?' ? (
        <ListItem className="list-item">
          <Avatar>
            <PrivilegeIcon />
          </Avatar>
          <ListItemText
            primary={speaker.privilege || ''}
            secondary="Przywilej"
          />
        </ListItem>
      ) : null;
    const email = speaker.email ? (
      <ListItem className="list-item">
        <Avatar>
          <EmailIcon />
        </Avatar>
        <ListItemText primary={speaker.email} secondary="Email" />
      </ListItem>
    ) : null;
    const phone = speaker.phone ? (
      <ListItem className="list-item">
        <Avatar>
          <PhoneIcon />
        </Avatar>
        <ListItemText primary={speaker.phone} secondary="Telefon" />
      </ListItem>
    ) : null;
    const last_lecture_date = speaker.last_lecture_date ? (
      <ListItem className="list-item">
        <Avatar>
          <LastLectureIcon />
        </Avatar>
        <ListItemText
          primary={speaker.last_lecture_date}
          secondary="Ostatni wykład"
        />
      </ListItem>
    ) : null;
    const note = speaker.note ? (
      <ListItem className="list-item">
        <Avatar>
          <NotesIcon />
        </Avatar>
        <ListItemText primary={speaker.note} secondary="Uwagi" />
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
                <MenuItem onClick={this.handleSpeakerUpdate}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edytuj" />
                </MenuItem>
                <MenuItem onClick={this.handleSpeakerDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuń" />
                </MenuItem>
              </Menu>
            </div>
          }
          title={speaker.name}
        />
        <CardContent className="card-content">
          <List>
            {congregation}
            {privilege}
            {email}
            {phone}
            {last_lecture_date}
            {note}
          </List>
        </CardContent>
      </Card>
    );
  }
}

SpeakerCard.propTypes = {
  speaker: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default SpeakerCard;

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
  History as LastLectureIcon,
  FormatListNumbered as NumberIcon
} from '@material-ui/icons';

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

    const number = lecture.number ? (
      <ListItem className="list-item">
        <Avatar><NumberIcon /></Avatar>
        <ListItemText primary={lecture.number} secondary="Numer" />
      </ListItem>
    ) : null;
    const notes = lecture.uwagi ? (
      <ListItem className="list-item">
        <Avatar><LastLectureIcon /></Avatar>
        <ListItemText primary={lecture.uwagi} secondary="Ostatni wykład" />
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
          title={lecture.title}
        />
        <CardContent className="card-content">
          <List>
            {number}
            {notes}
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

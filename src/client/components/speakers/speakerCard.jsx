import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    const congregation = speaker.congregation || '';
    const subheader = speaker.privilege && speaker.privilege !== '?' ? `${speaker.privilege}, ${congregation}` : congregation;
    const phone = speaker.phone ? <Typography component="p">tel: {speaker.phone}</Typography> : null;
    const email = speaker.email ? <Typography component="p">email: {speaker.email}</Typography> : null;
    const last_lecture = speaker.last_lecture_date ? <Typography color="textSecondary">ostatni wykład: {speaker.last_lecture_date}</Typography> : null;

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
          subheader={subheader}
        />
        <CardContent className="card-content">
          <div className="divider" />
          {phone}
          {email}
          {last_lecture}
          <Typography component="p">
            {speaker.note}
          </Typography>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchPrepared,
  newPrepared,
  deletePrepared
} from '../../actions/preparedActions';
import PreparedDialog from './preparedDialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
  Public as CongregationsIcon,
  Assignment as PreparedIcon,
  OpenInNew as OpenPreparedIcon
} from '@material-ui/icons';

class SpeakerCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      anchorEl: null,
      isPreparedOpen: false
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

  handlePreparedOpen = () => {
    this.props.fetchPrepared(this.props.speaker.id);
    this.setState({ isPreparedOpen: true });
  }

  handlePreparedClose = () => {
    this.setState({ isPreparedOpen: false });
  }

  render() {
    const { speaker, lectures } = this.props;
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
          primary={moment(speaker.last_lecture_date).format('D MMMM YYYY')}
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
    const prepared = (
      <ListItem className="list-item">
        <Avatar>
          <PreparedIcon />
        </Avatar>
        <ListItemText primary="Przygotowane" secondary="Przygotowane" />
        <ListItemSecondaryAction>
          <IconButton aria-label="Przygotowane" onClick={this.handlePreparedOpen}>
            <OpenPreparedIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

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
            {prepared}
            {note}
          </List>
        </CardContent>
        <CardActions>
          <PreparedDialog 
            prepared={this.props.prepared} 
            lectures={lectures} 
            onClose={this.handlePreparedClose}
            opened={this.state.isPreparedOpen}
          />
        </CardActions>
      </Card>
    );
  }
}

SpeakerCard.propTypes = {
  speaker: PropTypes.object.isRequired,
  lectures: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  prepared: PropTypes.array.isRequired,
  fetchPrepared: PropTypes.func.isRequired,
  newPrepared: PropTypes.func.isRequired,
  deletePrepared: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  prepared: state.prepared.items
});

const mapDispatchToProps = {
  fetchPrepared,
  newPrepared,
  deletePrepared
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakerCard);

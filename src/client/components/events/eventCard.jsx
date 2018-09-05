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
          subheader={`${event.event_date} ${event.event_time}`}
        />
        <CardContent className="card-content">
          <Typography variant="headline" component="h3">
            {event.lecture || event.note}
          </Typography>
          <Typography component="p">{event.speaker}</Typography>
          <Typography color="textSecondary">{event.congregation}</Typography>
          <Typography component="p">
            {event.note && event.lecture ? event.note : ''}
          </Typography>
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

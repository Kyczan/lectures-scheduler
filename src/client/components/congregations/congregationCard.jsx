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
          subheader={`${congregation.number}`}
        />
        <CardContent className="card-content">
          <Typography color="textSecondary">
            Mówców: {congregation.speakers_count}
          </Typography>
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

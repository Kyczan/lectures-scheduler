import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents, deleteEvent } from '../actions/eventsActions';
import EventCard from './cards/eventCard';
import DeleteDialog from './utils/deleteDialog';
import AddEventDialog from './utils/addEventDialog';
import Grid from '@material-ui/core/Grid';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      isDelOpen: false,
      eventToDel: {}
    };
  }
  componentDidMount() {
    this.props.fetchEvents();
  }

  handleEventDelete = event => {
    this.setState({ isDelOpen: true, eventToDel: event });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteEvent(this.state.eventToDel.id);
    this.setState({ isDelOpen: false });
  };

  render() {
    const lastYear = new Date() - 1000 * 60 * 60 * 24 * 365; // today - 1 yr
    const lastYearStr = new Date(lastYear).toJSON().substring(0, 10); // format yyyy-mm-dd
    const filtered = this.props.events.filter(
      event => event.event_date > lastYearStr
    );

    filtered.sort((a, b) => {
      if (a.event_date < b.event_date) return 1;
      if (a.event_date > b.event_date) return -1;
      return 0;
    });

    const eventsItems = filtered.map(event => (
      <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
        <EventCard
          onDelete={() => this.handleEventDelete(event)}
          event={event}
        />
      </Grid>
    ));

    return (
      <div className="container">
        <AddEventDialog />
        <DeleteDialog
          event={this.state.eventToDel}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Grid container alignItems="stretch" spacing={16}>
          {eventsItems}
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.events.items
});

const mapDispatchToProps = {
  fetchEvents,
  deleteEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

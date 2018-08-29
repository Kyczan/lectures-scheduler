import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/eventsActions';
import EventCard from './cards/EventCard';
import Grid from '@material-ui/core/Grid';

class Events extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }

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
        <EventCard event={event} />
      </Grid>
    ));

    return (
      <div className="container">
        <Grid container alignItems="stretch" spacing={16}>
          {eventsItems}
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.events.items
});

export default connect(
  mapStateToProps,
  { fetchEvents }
)(Events);

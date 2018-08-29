import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/eventsActions';
import PlanerCard from './PlanerCard';
import Grid from '@material-ui/core/Grid';

class Plan extends Component {

  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }
  
  render() {
    const eventsItems = this.props.events.map(event => (
      <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
        <PlanerCard />
      </Grid>
    ));
    return (
      <div className="container">
        <Grid container spacing={24}>
          {eventsItems}
        </Grid>
      </div>
    );
  }
}

Plan.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  events: state.events.items
});

export default connect(mapStateToProps, { fetchEvents })(Plan);

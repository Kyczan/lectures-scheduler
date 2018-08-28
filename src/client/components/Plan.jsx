import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/eventsActions';

class Plan extends Component {

  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }
  render() {
    const eventsItems = this.props.events.map(event => (
      <div key={event.id}>
        <h3>{event.id}</h3>
      </div>
    ));
    return (
      <div className="container">
        <h1>Plan!!</h1>
        {eventsItems}
      </div>
    );
  }
}
Plan.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.events.items
});

export default connect(mapStateToProps, { fetchEvents })(Plan);

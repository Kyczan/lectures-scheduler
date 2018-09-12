import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchEvents } from '../../actions/eventsActions';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }
  handleChange = e => {
    const data = {
      searchArray: this.props.searchArray,
      searchKeys: this.props.searchKeys, 
      searchString: e.target.value
    };
    const filtered = this.props.searchEvents(data).payload.filtered;
    this.props.onFilter(filtered);
  };

  render() {
    return (
      <TextField
        id="search"
        label="Szukaj"
        onChange={this.handleChange}
        helperText={
          this.state.counter > 0 ? `Znaleziono: ${this.state.counter}` : ''
        }
      />
    );
  }
}

SearchBar.propTypes = {
  searchArray: PropTypes.array.isRequired,
  searchKeys: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  filteredArray: PropTypes.array.isRequired,
  searchEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filteredArray: state.events.filtered
});

const mapDispatchToProps = {
  searchEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

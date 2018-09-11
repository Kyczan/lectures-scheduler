import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }
  handleChange = e => {
    const { searchArray, searchKeys } = this.props;
    const searchString = e.target.value.toLowerCase();
    if (searchString.length === 0) {
      return this.setState(
        {
          counter: 0
        },
        this.props.onFilter(searchArray)
      );
    }
    const filtered = searchArray.filter(obj => {
      let sum = 0;
      searchKeys.forEach(key => {
        if (obj[key] && obj[key].toLowerCase().indexOf(searchString) > -1)
          sum++;
      });
      return sum ? true : false;
    });
    this.setState(
      {
        counter: filtered.length
      },
      this.props.onFilter(filtered)
    );
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
  onFilter: PropTypes.func.isRequired
};

export default SearchBar;

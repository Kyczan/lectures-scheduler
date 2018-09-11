import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {

  handleChange = e => {
    const { searchArray, searchKeys } = this.props;
    const searchString = e.target.value.toLowerCase();
    const filtered = searchArray.filter(
      obj => {
        let sum = 0;
        searchKeys.forEach(key => {
          if(obj[key] && obj[key].toLowerCase().indexOf(searchString)>-1)
            sum++;
        });
        return sum ? true : false;
      }
    );
    this.props.onFilter(filtered);
  }

  render() {
    return (
      <TextField
        id="search"
        label="Szukaj"
        onChange={this.handleChange}
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
  
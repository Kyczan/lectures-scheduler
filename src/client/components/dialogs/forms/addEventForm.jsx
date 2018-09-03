import React, { Component } from 'react';
import SelectData from './selectData';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class AddEventForm extends Component {

    state = {
      single: null,
      multi: null,
    };

    handleChange = name => value => {
      this.setState({
        [name]: value,
      });
    };

    render() {
      return (
        <div className="form-wrapper">
          <SelectData/>
          <div className="divider" />
          <FormControl className="input-data">
            <InputLabel htmlFor="notes">Uwagi</InputLabel>
            <Input id="notes" />
          </FormControl>
        </div>
      );
    }
}

export default AddEventForm;

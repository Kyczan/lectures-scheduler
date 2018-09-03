import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AddIcon from '@material-ui/icons/Add';
import SelectData from './selectData';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('pl');

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  {
    label:
      'Bolivia, Plurinational State of Bolivia, Plurinational State of Bolivia, Plurinational State of'
  },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

class AddEventDialog extends Component {
  state = {
    open: false,
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const { selectedDate } = this.state;

    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="fab"
          color="primary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          scroll="body"
        >
          <DialogTitle id="responsive-dialog-title">
            Dodaj nowe wydarzenie
          </DialogTitle>
          <DialogContent style={{ overflow: 'visible' }}>
            <div className="form-wrapper">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  className="form-date-picker"
                  format="DD MMM YYYY"
                  label="Data"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  className="form-date-picker"
                  ampm={false}
                  label="Godzina"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <div className="divider" />
              <SelectData suggestions={suggestions} label="Wykład" />
              <div className="divider" />
              <SelectData suggestions={suggestions} label="Mówca" />
              <div className="divider" />
              <FormControl className="input-data">
                <InputLabel htmlFor="notes">Uwagi</InputLabel>
                <Input id="notes" />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddEventDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(AddEventDialog);

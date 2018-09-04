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
import 'moment/locale/pl';

moment.locale('pl');

class AddEventDialog extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedDate: null
    };
  }
  componentDidMount(){
    const d = new Date();
    const hours = this.props.defaultEventTime.split(':');
    d.setHours(hours[0], hours[1], 0, 0);
    this.setState({
      selectedDate: d
    });
  }
  
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
    const { fullScreen, lectures, speakers } = this.props;
    const { selectedDate } = this.state;

    lectures.sort((a, b) => {
      return a.number - b.number;
    });

    const suggestedLectures = lectures.map(lecture => ({
      value: lecture,
      label: `${lecture.number}. ${lecture.title}`
    }));

    speakers.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const suggestedSpeakers = speakers.map(speaker => {
      const congregation = speaker.congregation_name ? ` [${speaker.congregation_name}]` : '';
      return {
        value: speaker,
        label: `${speaker.name}${congregation}`
      };
    });

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
              <SelectData suggestions={suggestedLectures} label="Wykład" />
              <div className="divider" />
              <SelectData suggestions={suggestedSpeakers} label="Mówca" />
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
  fullScreen: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
  speakers: PropTypes.array.isRequired,
  defaultEventTime: PropTypes.string.isRequired
};

export default withMobileDialog()(AddEventDialog);

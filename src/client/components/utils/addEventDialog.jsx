import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
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
      selectedDate: null,
      toReturn: {
        lecture_id: null,
        speaker_id: null,
        note: null
      }
    };
  }

  getStringDate(d) {
    const strDate = d.format('YYYY-MM-DD');
    const strTime = d.format('HH:mm');
    return [strDate, strTime];
  }

  componentDidMount() {
    const d = moment();
    const hours = this.props.defaultEventTime.split(':');
    d.hours(hours[0]);
    d.minutes(hours[1]);
    d.second(0);
    d.millisecond(0);
    const strDate = this.getStringDate(d);
    this.setState({
      selectedDate: d,
      toReturn: {
        ...this.state.toReturn,
        event_date: strDate[0],
        event_time: strDate[1]
      }
    });
  }

  handleDateChange = date => {
    const time = this.state.toReturn.event_time;
    const hours = time.split(':');
    date.hours(hours[0]);
    date.minutes(hours[1]);
    const strDate = this.getStringDate(date);
    this.setState({
      selectedDate: date,
      toReturn: {
        ...this.state.toReturn,
        event_date: strDate[0],
        event_time: strDate[1]
      }
    });
  };

  handleTimeChange = date => {
    const strDate = this.getStringDate(date);
    this.setState({
      selectedDate: date,
      toReturn: {
        ...this.state.toReturn,
        event_time: strDate[1]
      }
    });
  };

  handleSelect = field => value => {
    const id = value && value.id ? value.id : null;
    this.setState({
      toReturn: {
        ...this.state.toReturn,
        [field]: id
      }
    });
  };

  handleFormChange = field => e => {
    this.setState({
      toReturn: {
        ...this.state.toReturn,
        [field]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitEvent(this.state.toReturn);
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
      const congregation = speaker.congregation_name
        ? ` [${speaker.congregation_name}]`
        : '';
      return {
        value: speaker,
        label: `${speaker.name}${congregation}`
      };
    });

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.opened}
          onClose={this.props.onClose}
          aria-labelledby="responsive-dialog-title"
          scroll="body"
        >
          <form onSubmit={this.handleSubmit}>
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
                    onChange={this.handleTimeChange}
                  />
                </MuiPickersUtilsProvider>
                <div className="divider" />
                <SelectData
                  suggestions={suggestedLectures}
                  label="Wykład"
                  handleSelect={this.handleSelect('lecture_id')}
                />
                <div className="divider" />
                <SelectData
                  suggestions={suggestedSpeakers}
                  label="Mówca"
                  handleSelect={this.handleSelect('speaker_id')}
                />
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="notes">Uwagi</InputLabel>
                  <Input
                    id="notes"
                    name="note"
                    onChange={this.handleFormChange('note')}
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Anuluj
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Dodaj
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddEventDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
  speakers: PropTypes.array.isRequired,
  defaultEventTime: PropTypes.string.isRequired,
  onSubmitEvent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired
};

export default withMobileDialog()(AddEventDialog);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SelectData from '../utils/selectData';
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

class AddSpeakerDialog extends Component {
  constructor() {
    super();
    this.state = {
      clean: true,
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
    this.initializeDate();
  }

  componentDidUpdate(prevProps) {
    const hasDefaults = this.props.speaker.speaker_date ? true : false;
    if (hasDefaults) {
      const setDate = moment(
        `${this.props.speaker.speaker_date} ${this.props.speaker.speaker_time}`
      );
      if (!this.state.selectedDate.isSame(setDate) && this.state.clean) {
        this.setState({
          clean: false,
          selectedDate: setDate,
          toReturn: {
            ...this.state.toReturn
          }
        });
      }
      if (prevProps.speaker.id !== this.props.speaker.id) {
        this.setState({
          toReturn: {
            lecture_id: this.props.speaker.lecture_id || null,
            speaker_id: this.props.speaker.speaker_id || null,
            note: this.props.speaker.note || null,
            speaker_date: this.props.speaker.speaker_date,
            speaker_time: this.props.speaker.speaker_time,
            id: this.props.speaker.id
          }
        });
      }
    } else {
      if (prevProps.speaker.id && !this.props.speaker.id) {
        const toReturn = { ...this.state.toReturn };
        delete toReturn.id;
        this.setState(
          {
            toReturn: {
              ...toReturn,
              lecture_id: null,
              speaker_id: null,
              note: null
            }
          },
          () => {
            this.initializeDate();
          }
        );
      }
    }
  }

  initializeDate() {
    const setDate = moment();
    const hours = this.props.defaultSpeakerTime.split(':');
    setDate.hours(hours[0]);
    setDate.minutes(hours[1]);
    setDate.second(0);
    setDate.millisecond(0);
    const strDate = this.getStringDate(setDate);
    this.setState({
      selectedDate: setDate,
      toReturn: {
        ...this.state.toReturn,
        speaker_date: strDate[0],
        speaker_time: strDate[1]
      }
    });
  }

  handleDateChange = date => {
    const time = this.state.toReturn.speaker_time;
    const hours = time.split(':');
    date.hours(hours[0]);
    date.minutes(hours[1]);
    const strDate = this.getStringDate(date);
    this.setState({
      selectedDate: date,
      toReturn: {
        ...this.state.toReturn,
        speaker_date: strDate[0],
        speaker_time: strDate[1]
      }
    });
  };

  handleTimeChange = date => {
    const strDate = this.getStringDate(date);
    this.setState({
      selectedDate: date,
      toReturn: {
        ...this.state.toReturn,
        speaker_time: strDate[1]
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
    this.props.onSubmitSpeaker(this.state.toReturn);
  };

  render() {
    const { fullScreen, lectures, speakers, speaker } = this.props;
    const { selectedDate } = this.state;
    let defaultLecture = {};
    let defaultSpeaker = {};

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

    if (speaker.lecture_id) {
      defaultLecture = suggestedLectures.filter(
        lecture => lecture.value.id === speaker.lecture_id
      )[0];
    }
    if (speaker.speaker_id) {
      defaultSpeaker = suggestedSpeakers.filter(
        speaker => speaker.value.id === speaker.speaker_id
      )[0];
    }

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
              {speaker.id ? 'Edytuj wydarzenie' : 'Dodaj nowe wydarzenie'}
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
                    showTodayButton
                    todayLabel="Dzisiaj"
                    cancelLabel="Anuluj"
                  />
                  <TimePicker
                    className="form-date-picker"
                    ampm={false}
                    label="Godzina"
                    value={selectedDate}
                    onChange={this.handleTimeChange}
                    cancelLabel="Anuluj"
                  />
                </MuiPickersUtilsProvider>
                <div className="divider" />
                <SelectData
                  suggestions={suggestedLectures}
                  label="Wykład"
                  handleSelect={this.handleSelect('lecture_id')}
                  defaultValue={defaultLecture}
                />
                <div className="divider" />
                <SelectData
                  suggestions={suggestedSpeakers}
                  label="Mówca"
                  handleSelect={this.handleSelect('speaker_id')}
                  defaultValue={defaultSpeaker}
                />
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="notes">Uwagi</InputLabel>
                  <Input
                    id="note"
                    name="note"
                    onChange={this.handleFormChange('note')}
                    defaultValue={speaker.note || null}
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Anuluj
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Zapisz
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddSpeakerDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
  speakers: PropTypes.array.isRequired,
  defaultSpeakerTime: PropTypes.string.isRequired,
  onSubmitSpeaker: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  speaker: PropTypes.object.isRequired
};

export default withMobileDialog()(AddSpeakerDialog);

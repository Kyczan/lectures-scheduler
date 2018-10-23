import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchEvents,
  newEvent,
  deleteEvent,
  updateEvent
} from '../../actions/eventsActions';
import { fetchSpeakers } from '../../actions/speakersActions';
import { fetchLectures } from '../../actions/lecturesActions';
import { fetchSetting } from '../../actions/settingsActions';
import { searchData, sortData } from '../../actions/searchActions';
import EventCard from './eventCard';
import DeleteDialog from '../utils/deleteDialog';
import AddEventDialog from './addEventDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Events extends Component {
  constructor(props) {
    super(props);
    if (!props.defaultEventTime.value) props.fetchSetting('DEFAULT_EVENT_TIME');
    this.state = {
      filteredData: props.events,
      isDelOpen: false,
      eventToDel: {},
      isAddEventOpen: false,
      eventToUpdate: {},
      flash: {
        opened: false,
        msg: ''
      }
    };
  }

  componentDidMount() {
    this.props.handleInit({
      sortKeys: [{ key: 'event_date', name: 'Data' }],
      sortInput: {
        sortKey: 'event_date',
        direction: 'desc'
      },
      label: 'Plan'
    });
    if (!this.props.events.length) {
      this.props.fetchEvents().then(() => {
        this.filterData();
      });
    } else {
      this.filterData();
    }
    if (!this.props.speakers.length) this.props.fetchSpeakers();
    if (!this.props.lectures.length) this.props.fetchLectures();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchText !== this.props.searchText ||
      prevProps.sortInput.direction !== this.props.sortInput.direction ||
      prevProps.sortInput.sortKey !== this.props.sortInput.sortKey
    ) {
      this.filterData();
    }
  }

  filterData = () => {
    const searchData = {
      searchArray: this.props.events,
      searchKeys: ['lecture', 'speaker', 'note', 'event_date'],
      searchString: this.props.searchText
    };
    const filtered = this.props.searchData(searchData).payload;
    const sortData = {
      sortArray: filtered,
      ...this.props.sortInput
    };
    const sorted = this.props.sortData(sortData).payload;
    this.setState({
      filteredData: sorted
    });
  };

  handleEventDelete = event => {
    this.setState({ isDelOpen: true, eventToDel: event });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteEvent(this.state.eventToDel.id).then(() => {
      this.filterData();
      this.setState({
        flash: {
          opened: true,
          msg: 'Usunięto wydarzenie!'
        }
      });
    });
    this.setState({ isDelOpen: false });
  };

  handleEventAdd = event => {
    this.props
      .fetchSetting('DEFAULT_EVENT_TIME')
      .then(() =>
        this.setState({ isAddEventOpen: true, eventToUpdate: event })
      );
  };

  handleEventSubmit = event => {
    this.handleAddEventClose();
    if (event.id) {
      this.props.updateEvent(event).then(() => {
        this.filterData();
        this.setState({
          flash: {
            opened: true,
            msg: 'Zaktualizowano wydarzenie!'
          }
        });
      });
    } else {
      this.props.newEvent(event).then(() => {
        this.filterData();
        this.setState({
          flash: {
            opened: true,
            msg: 'Dodano nowe wydarzenie!'
          }
        });
      });
    }
  };

  handleAddEventClose = () => {
    this.setState({ isAddEventOpen: false });
  };

  handleFlashClose = () => {
    this.setState({
      flash: {
        opened: false,
        msg: ''
      }
    });
  };

  render() {
    if (!this.props.defaultEventTime.value) return null;

    const filtered = this.state.filteredData.slice(0, 60);
    const eventsItems = filtered.map(event => (
      <Grid key={event.id} item xs={12} sm={6} md={4} lg={3}>
        <EventCard
          onDelete={() => this.handleEventDelete(event)}
          onUpdate={() => this.handleEventAdd(event)}
          event={event}
        />
      </Grid>
    ));

    return (
      <div className="container">
        <SnackbarMessage
          message={this.state.flash.msg}
          opened={this.state.flash.opened}
          handleClose={this.handleFlashClose}
        />
        <AddEventDialog
          lectures={this.props.lectures}
          speakers={this.props.speakers}
          defaultEventTime={this.props.defaultEventTime.value}
          onSubmitEvent={this.handleEventSubmit}
          onClose={this.handleAddEventClose}
          event={this.state.eventToUpdate}
          opened={this.state.isAddEventOpen}
        />
        <DeleteDialog
          deleteMsg={`${this.state.eventToDel.event_date} ${
            this.state.eventToDel.event_time
          }`}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Button
          onClick={() => this.handleEventAdd({})}
          color="secondary"
          variant="fab"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <Grid container alignItems="stretch" spacing={16}>
          {eventsItems}
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  newEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  fetchSpeakers: PropTypes.func.isRequired,
  fetchLectures: PropTypes.func.isRequired,
  fetchSetting: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  lectures: PropTypes.array.isRequired,
  speakers: PropTypes.array.isRequired,
  defaultEventTime: PropTypes.object.isRequired,
  searchData: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  sortData: PropTypes.func.isRequired,
  sortInput: PropTypes.object,
  handleInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events.items,
  lectures: state.lectures.items,
  speakers: state.speakers.items,
  defaultEventTime: state.setting.item
});

const mapDispatchToProps = {
  fetchEvents,
  newEvent,
  updateEvent,
  deleteEvent,
  fetchSpeakers,
  fetchLectures,
  fetchSetting,
  searchData,
  sortData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

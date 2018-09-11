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
import EventCard from './eventCard';
import DeleteDialog from '../utils/deleteDialog';
import AddEventDialog from './addEventDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import SearchBar from '../utils/searchBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Events extends Component {
  constructor(props) {
    super(props);
    props.fetchSetting('DEFAULT_EVENT_TIME');
    this.state = {
      filteredData: this.props.events,
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
    this.props.fetchEvents();
    this.props.fetchSpeakers();
    this.props.fetchLectures();
  }

  handleEventDelete = event => {
    this.setState({ isDelOpen: true, eventToDel: event });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteEvent(this.state.eventToDel.id).then(() => {
      this.setState({
        filteredData: this.props.events,
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
        this.setState({
          filteredData: this.props.events,
          flash: {
            opened: true,
            msg: 'Zaktualizowano wydarzenie!'
          }
        });
      });
    } else {
      this.props.newEvent(event).then(() => {
        this.setState({
          filteredData: this.props.events,
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

  handleFilter = filteredData => {
    this.setState({
      filteredData
    });
  }

  render() {
    if (!this.props.defaultEventTime.value) return null;
    const lastYear = new Date() - 1000 * 60 * 60 * 24 * 365; // today - 1 yr
    const lastYearStr = new Date(lastYear).toJSON().substring(0, 10); // format yyyy-mm-dd
    const dataToRender = this.state.filteredData.length ? this.state.filteredData : this.props.events;
    const filtered = dataToRender.filter(
      event => event.event_date > lastYearStr
    );

    filtered.sort((a, b) => {
      if (a.event_date < b.event_date) return 1;
      if (a.event_date > b.event_date) return -1;
      return 0;
    });

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
          variant="fab"
          color="primary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <SearchBar
          searchArray={this.props.events}
          searchKeys={['lecture','speaker']}
          onFilter={this.handleFilter}
        />
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
  defaultEventTime: PropTypes.object.isRequired
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
  fetchSetting
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

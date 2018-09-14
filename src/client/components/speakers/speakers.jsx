import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchSpeakers,
  newSpeaker,
  deleteSpeaker,
  updateSpeaker
} from '../../actions/speakersActions';
import { fetchCongregations } from '../../actions/congregationsActions';
import { fetchLectures } from '../../actions/lecturesActions';
import { searchData, sortData } from '../../actions/searchActions';
import SpeakerCard from './speakerCard';
import DeleteDialog from '../utils/deleteDialog';
import AddSpeakerDialog from './addSpeakerDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Speakers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: props.speakers,
      isDelOpen: false,
      speakerToDel: {},
      isAddSpeakerOpen: false,
      speakerToUpdate: {},
      flash: {
        opened: false,
        msg: ''
      }
    };
  }
  componentDidMount() {
    this.props.handleInit({
      sortKeys: [
        { key: 'name', name: 'Nazwisko' },
        { key: 'congregation_name', name: 'Zbór' },
        { key: 'last_lecture_date', name: 'Ostatni wykład' }
      ],
      sortInput: {
        sortKey: 'name',
        direction: 'asc'
      },
      label: 'Mówcy'
    });
    this.props.fetchSpeakers().then(() => {
      const data = {
        sortArray: this.props.speakers,
        ...this.props.sortInput
      };
      const sorted = this.props.sortData(data).payload;
      this.setState({ filteredData: sorted });
    });
    this.props.fetchCongregations();
    this.props.fetchLectures();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchText !== this.props.searchText ||
      prevProps.sortInput.direction !== this.props.sortInput.direction ||
      prevProps.sortInput.sortKey !== this.props.sortInput.sortKey
    ) {
      const searchData = {
        searchArray: this.props.speakers,
        searchKeys: [
          'name',
          'note',
          'privilege',
          'phone',
          'email',
          'congregation'
        ],
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
    }
  }

  handleSpeakerDelete = speaker => {
    this.setState({ isDelOpen: true, speakerToDel: speaker });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteSpeaker(this.state.speakerToDel.id).then(() => {
      this.setState({
        filteredData: this.props.speakers,
        flash: {
          opened: true,
          msg: 'Usunięto mówcę!'
        }
      });
    });
    this.setState({ isDelOpen: false });
  };

  handleSpeakerAdd = speaker => {
    this.setState({ isAddSpeakerOpen: true, speakerToUpdate: speaker });
  };

  handleSpeakerSubmit = speaker => {
    this.handleAddSpeakerClose();
    if (speaker.id) {
      this.props.updateSpeaker(speaker).then(() => {
        this.setState({
          flash: {
            filteredData: this.props.speakers,
            opened: true,
            msg: 'Zaktualizowano mówcę!'
          }
        });
      });
    } else {
      this.props.newSpeaker(speaker).then(() => {
        this.setState({
          flash: {
            filteredData: this.props.speakers,
            opened: true,
            msg: 'Dodano nowego mówcę!'
          }
        });
      });
    }
  };

  handleAddSpeakerClose = () => {
    this.setState({ isAddSpeakerOpen: false });
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
    const { lectures } = this.props;
    const filtered = this.state.filteredData;
    const speakersItems = filtered.map(speaker => (
      <Grid key={speaker.id} item xs={12} sm={6} md={4} lg={3}>
        <SpeakerCard
          onDelete={() => this.handleSpeakerDelete(speaker)}
          onUpdate={() => this.handleSpeakerAdd(speaker)}
          speaker={speaker}
          lectures={lectures}
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
        <AddSpeakerDialog
          congregations={this.props.congregations}
          onSubmitSpeaker={this.handleSpeakerSubmit}
          onClose={this.handleAddSpeakerClose}
          speaker={this.state.speakerToUpdate}
          opened={this.state.isAddSpeakerOpen}
        />
        <DeleteDialog
          deleteMsg={this.state.speakerToDel.name || ''}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Button
          onClick={() => this.handleSpeakerAdd({})}
          variant="fab"
          color="secondary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <Grid container alignItems="stretch" spacing={16}>
          {speakersItems}
        </Grid>
      </div>
    );
  }
}

Speakers.propTypes = {
  fetchSpeakers: PropTypes.func.isRequired,
  newSpeaker: PropTypes.func.isRequired,
  updateSpeaker: PropTypes.func.isRequired,
  deleteSpeaker: PropTypes.func.isRequired,
  fetchCongregations: PropTypes.func.isRequired,
  speakers: PropTypes.array.isRequired,
  congregations: PropTypes.array.isRequired,
  lectures: PropTypes.array.isRequired,
  fetchLectures: PropTypes.func.isRequired,
  searchData: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  sortData: PropTypes.func.isRequired,
  sortInput: PropTypes.object,
  handleInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  speakers: state.speakers.items,
  congregations: state.congregations.items,
  lectures: state.lectures.items
});

const mapDispatchToProps = {
  fetchSpeakers,
  newSpeaker,
  updateSpeaker,
  deleteSpeaker,
  fetchCongregations,
  fetchLectures,
  searchData,
  sortData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Speakers);

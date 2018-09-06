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
import SpeakerCard from './speakerCard';
import DeleteDialog from '../utils/deleteDialog';
import AddSpeakerDialog from './addSpeakerDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Speakers extends Component {
  constructor() {
    super();
    this.state = {
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
    this.props.fetchSpeakers();
    this.props.fetchCongregations();
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
            opened: true,
            msg: 'Zaktualizowano mówcę!'
          }
        });
      });
    } else {
      this.props.newSpeaker(speaker).then(() => {
        this.setState({
          flash: {
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
    const { speakers } = this.props;
    
    speakers.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const speakersItems = speakers.map(speaker => (
      <Grid key={speaker.id} item xs={12} sm={6} md={4} lg={3}>
        <SpeakerCard
          onDelete={() => this.handleSpeakerDelete(speaker)}
          onUpdate={() => this.handleSpeakerAdd(speaker)}
          speaker={speaker}
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
          deleteMsg={this.state.speakerToDel.name  || ''}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Button
          onClick={() => this.handleSpeakerAdd({})}
          variant="fab"
          color="primary"
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
  congregations: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  speakers: state.speakers.items,
  congregations: state.congregations.items
});

const mapDispatchToProps = {
  fetchSpeakers,
  newSpeaker,
  updateSpeaker,
  deleteSpeaker,
  fetchCongregations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Speakers);

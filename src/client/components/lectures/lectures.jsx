import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchLectures,
  newLecture,
  deleteLecture,
  updateLecture
} from '../../actions/lecturesActions';
import LectureCard from './lectureCard';
import DeleteDialog from '../utils/deleteDialog';
import AddLectureDialog from './addLectureDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Lectures extends Component {
  constructor() {
    super();
    this.state = {
      isDelOpen: false,
      lectureToDel: {},
      isAddLectureOpen: false,
      lectureToUpdate: {},
      flash: {
        opened: false,
        msg: ''
      }
    };
  }
  componentDidMount() {
    this.props.fetchLectures();
  }

  handleLectureDelete = lecture => {
    this.setState({ isDelOpen: true, lectureToDel: lecture });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteLecture(this.state.lectureToDel.id).then(() => {
      this.setState({
        flash: {
          opened: true,
          msg: 'Usunięto wykład!'
        }
      });
    });
    this.setState({ isDelOpen: false });
  };

  handleLectureAdd = lecture => {
    this.setState({
      isAddLectureOpen: true,
      lectureToUpdate: lecture
    });
  };

  handleLectureSubmit = lecture => {
    this.handleAddLectureClose();
    if (lecture.id) {
      this.props.updateLecture(lecture).then(() => {
        this.setState({
          flash: {
            opened: true,
            msg: 'Zaktualizowano wykład!'
          }
        });
      });
    } else {
      this.props.newLecture(lecture).then(() => {
        this.setState({
          flash: {
            opened: true,
            msg: 'Dodano nowy wykład!'
          }
        });
      });
    }
  };

  handleAddLectureClose = () => {
    this.setState({ isAddLectureOpen: false });
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
    if (!this.props.lectures.length) return null;
    const { lectures } = this.props;

    lectures.sort((a, b) => {
      if (a.number < b.number) return -1;
      if (a.number > b.number) return 1;
      return 0;
    });

    const lecturesItems = lectures.map(lecture => (
      <Grid key={lecture.id} item xs={12} sm={6} md={4} lg={3}>
        <LectureCard
          onDelete={() => this.handleLectureDelete(lecture)}
          onUpdate={() => this.handleLectureAdd(lecture)}
          lecture={lecture}
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
        <AddLectureDialog
          onSubmitLecture={this.handleLectureSubmit}
          onClose={this.handleAddLectureClose}
          lecture={this.state.lectureToUpdate}
          opened={this.state.isAddLectureOpen}
        />
        <DeleteDialog
          deleteMsg={this.state.lectureToDel.name || ''}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Button
          onClick={() => this.handleLectureAdd({})}
          variant="fab"
          color="primary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <Grid container alignItems="stretch" spacing={16}>
          {lecturesItems}
        </Grid>
      </div>
    );
  }
}

Lectures.propTypes = {
  fetchLectures: PropTypes.func.isRequired,
  newLecture: PropTypes.func.isRequired,
  updateLecture: PropTypes.func.isRequired,
  deleteLecture: PropTypes.func.isRequired,
  lectures: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lectures: state.lectures.items
});

const mapDispatchToProps = {
  fetchLectures,
  newLecture,
  updateLecture,
  deleteLecture
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lectures);

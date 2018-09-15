import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchLectures,
  newLecture,
  deleteLecture,
  updateLecture
} from '../../actions/lecturesActions';
import { searchData, sortData } from '../../actions/searchActions';
import LectureCard from './lectureCard';
import DeleteDialog from '../utils/deleteDialog';
import AddLectureDialog from './addLectureDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Lectures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: props.lectures,
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
    this.props.handleInit({
      sortKeys: [
        { key: 'number', name: 'Numer' },
        { key: 'title', name: 'Tytuł' },
        { key: 'notes', name: 'Ostatnie wygłoszenie' }
      ],
      sortInput: {
        sortKey: 'number',
        direction: 'asc'
      },
      label: 'Wykłady'
    });
    if (!this.props.lectures.length) {
      this.props.fetchLectures().then(() => {
        this.filterData();
      });
    } else {
      this.filterData();
    }
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
      searchArray: this.props.lectures,
      searchKeys: ['number', 'title'],
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

  handleLectureDelete = lecture => {
    this.setState({ isDelOpen: true, lectureToDel: lecture });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteLecture(this.state.lectureToDel.id).then(() => {
      this.filterData();
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
        this.filterData();
        this.setState({
          flash: {
            opened: true,
            msg: 'Zaktualizowano wykład!'
          }
        });
      });
    } else {
      this.props.newLecture(lecture).then(() => {
        this.filterData();
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

    const filtered = this.state.filteredData;
    const lecturesItems = filtered.map(lecture => (
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
          color="secondary"
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
  lectures: PropTypes.array.isRequired,
  searchData: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  sortData: PropTypes.func.isRequired,
  sortInput: PropTypes.object,
  handleInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lectures: state.lectures.items
});

const mapDispatchToProps = {
  fetchLectures,
  newLecture,
  updateLecture,
  deleteLecture,
  searchData,
  sortData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lectures);

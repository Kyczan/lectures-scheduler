import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCongregations,
  newCongregation,
  deleteCongregation,
  updateCongregation
} from '../../actions/congregationsActions';
import { searchData, sortData } from '../../actions/searchActions';
import CongregationCard from './congregationCard';
import DeleteDialog from '../utils/deleteDialog';
import AddCongregationDialog from './addCongregationDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Congregations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: props.congregations,
      isDelOpen: false,
      congregationToDel: {},
      isAddCongregationOpen: false,
      congregationToUpdate: {},
      flash: {
        opened: false,
        msg: ''
      }
    };
  }

  componentDidMount() {
    this.props.handleInit({
      sortKeys: [
        { key: 'name', name: 'Nazwa' },
        { key: 'number', name: 'Numer' },
        { key: 'speakers_count', name: 'Liczba mówców' }
      ],
      sortInput: {
        sortKey: 'name',
        direction: 'asc'
      },
      label: 'Zbory'
    });
    if (!this.props.congregations.length) {
      this.props.fetchCongregations().then(() => {
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
      searchArray: this.props.congregations,
      searchKeys: ['number', 'name'],
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

  handleCongregationDelete = congregation => {
    this.setState({ isDelOpen: true, congregationToDel: congregation });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteCongregation(this.state.congregationToDel.id).then(() => {
      this.filterData();
      this.setState({
        flash: {
          opened: true,
          msg: 'Usunięto zbór!'
        }
      });
    });
    this.setState({ isDelOpen: false });
  };

  handleCongregationAdd = congregation => {
    this.setState({
      isAddCongregationOpen: true,
      congregationToUpdate: congregation
    });
  };

  handleCongregationSubmit = congregation => {
    this.handleAddCongregationClose();
    if (congregation.id) {
      this.props.updateCongregation(congregation).then(() => {
        this.filterData();
        this.setState({
          flash: {
            opened: true,
            msg: 'Zaktualizowano zbór!'
          }
        });
      });
    } else {
      this.props.newCongregation(congregation).then(() => {
        this.filterData();
        this.setState({
          flash: {
            opened: true,
            msg: 'Dodano nowy zbór!'
          }
        });
      });
    }
  };

  handleAddCongregationClose = () => {
    this.setState({ isAddCongregationOpen: false });
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
    if (!this.props.congregations.length) return null;

    const filtered = this.state.filteredData;
    const congregationsItems = filtered.map(congregation => (
      <Grid key={congregation.id} item xs={12} sm={6} md={4} lg={3}>
        <CongregationCard
          onDelete={() => this.handleCongregationDelete(congregation)}
          onUpdate={() => this.handleCongregationAdd(congregation)}
          congregation={congregation}
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
        <AddCongregationDialog
          onSubmitCongregation={this.handleCongregationSubmit}
          onClose={this.handleAddCongregationClose}
          congregation={this.state.congregationToUpdate}
          opened={this.state.isAddCongregationOpen}
        />
        <DeleteDialog
          deleteMsg={this.state.congregationToDel.name || ''}
          opened={this.state.isDelOpen}
          onClose={this.handleDelDialogClose}
          onConfirm={this.handleDelDialogConfirm}
        />
        <Fab
          onClick={() => this.handleCongregationAdd({})}
          color="secondary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Fab>
        <Grid container alignItems="stretch" spacing={16}>
          {congregationsItems}
        </Grid>
      </div>
    );
  }
}

Congregations.propTypes = {
  fetchCongregations: PropTypes.func.isRequired,
  newCongregation: PropTypes.func.isRequired,
  updateCongregation: PropTypes.func.isRequired,
  deleteCongregation: PropTypes.func.isRequired,
  congregations: PropTypes.array.isRequired,
  searchData: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  sortData: PropTypes.func.isRequired,
  sortInput: PropTypes.object,
  handleInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  congregations: state.congregations.items
});

const mapDispatchToProps = {
  fetchCongregations,
  newCongregation,
  updateCongregation,
  deleteCongregation,
  searchData,
  sortData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Congregations);

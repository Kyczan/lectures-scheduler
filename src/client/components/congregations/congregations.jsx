import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCongregations,
  newCongregation,
  deleteCongregation,
  updateCongregation
} from '../../actions/congregationsActions';
import CongregationCard from './congregationCard';
import DeleteDialog from '../utils/deleteDialog';
import AddCongregationDialog from './addCongregationDialog';
import SnackbarMessage from '../utils/snackbarMessage';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Congregations extends Component {
  constructor() {
    super();
    this.state = {
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
    this.props.fetchCongregations();
  }

  handleCongregationDelete = congregation => {
    this.setState({ isDelOpen: true, congregationToDel: congregation });
  };

  handleDelDialogClose = () => {
    this.setState({ isDelOpen: false });
  };

  handleDelDialogConfirm = () => {
    this.props.deleteCongregation(this.state.congregationToDel.id).then(() => {
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
        this.setState({
          flash: {
            opened: true,
            msg: 'Zaktualizowano zbór!'
          }
        });
      });
    } else {
      this.props.newCongregation(congregation).then(() => {
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
    const { congregations } = this.props;

    congregations.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const congregationsItems = congregations.map(congregation => (
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
        <Button
          onClick={() => this.handleCongregationAdd({})}
          variant="fab"
          color="primary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
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
  congregations: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  congregations: state.congregations.items
});

const mapDispatchToProps = {
  fetchCongregations,
  newCongregation,
  updateCongregation,
  deleteCongregation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Congregations);

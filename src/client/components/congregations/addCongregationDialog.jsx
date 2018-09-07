import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';

class AddCongregationDialog extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
      toReturn: {
        number: null,
        name: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const hasDefaults = this.props.congregation.name ? true : false;
    if (hasDefaults) {
      if (prevProps.congregation.id !== this.props.congregation.id) {
        this.setState({
          error: {},
          toReturn: {
            number: this.props.congregation.number || null,
            name: this.props.congregation.name || null,
            id: this.props.congregation.id
          }
        });
      }
    } else {
      if (prevProps.congregation.id && !this.props.congregation.id) {
        const toReturn = { ...this.state.toReturn };
        delete toReturn.id;
        this.setState({
          error: {},
          toReturn: {
            ...toReturn,
            number: null,
            name: null
          }
        });
      }
    }
  }

  handleFormChange = field => e => {
    this.setState({
      error: {
        ...this.state.error,
        [field]: e.target.value ? false : true
      },
      toReturn: {
        ...this.state.toReturn,
        [field]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitCongregation(this.state.toReturn);
  };

  render() {
    const { fullScreen, congregation } = this.props;

    const handleDisabled = () => {
      const errors = this.state.error;
      let size = 0;
      for (let key in errors) {
        if (errors[key]) size++;
      }
      return size ? true : false;
    };

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
              {congregation.name ? 'Edytuj zbór' : 'Dodaj nowy zbór'}
            </DialogTitle>
            <DialogContent style={{ overflow: 'visible' }}>
              <div className="form-wrapper">
                <TextField
                  required 
                  error={this.state.error.number}
                  id="number"
                  label="Numer"
                  fullWidth
                  type="number"
                  onChange={this.handleFormChange('number')}
                  defaultValue={congregation.number || null}
                  helperText={this.state.error.number ? 'Numer jest wymagany' : ''}
                />
                <div className="divider" />
                <TextField
                  required 
                  error={this.state.error.name}
                  id="name"
                  label="Nazwa"
                  fullWidth
                  onChange={this.handleFormChange('name')}
                  defaultValue={congregation.name || null}
                  helperText={this.state.error.name ? 'Nazwa jest wymagana' : ''}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Anuluj
              </Button>
              <Button type="submit" color="primary" autoFocus disabled={handleDisabled()}>
                Zapisz
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddCongregationDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onSubmitCongregation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  congregation: PropTypes.object.isRequired
};

export default withMobileDialog()(AddCongregationDialog);

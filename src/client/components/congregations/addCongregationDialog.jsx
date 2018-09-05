import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class AddCongregationDialog extends Component {
  constructor() {
    super();
    this.state = {
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
                <FormControl className="input-data">
                  <InputLabel htmlFor="number">Numer</InputLabel>
                  <Input
                    id="number"
                    name="number"
                    type="number"
                    onChange={this.handleFormChange('number')}
                    defaultValue={congregation.number || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="name">Nazwa</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    onChange={this.handleFormChange('name')}
                    defaultValue={congregation.name || null}
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

AddCongregationDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onSubmitCongregation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  congregation: PropTypes.object.isRequired
};

export default withMobileDialog()(AddCongregationDialog);

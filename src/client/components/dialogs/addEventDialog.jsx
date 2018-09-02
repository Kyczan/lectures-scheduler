import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AddIcon from '@material-ui/icons/Add';

class AddEventDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="fab"
          color="primary"
          aria-label="Dodaj"
          className="fab"
        >
          <AddIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Dodaj nowe wydarzenie
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              TODO: Formularz dodawania eventu
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddEventDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(AddEventDialog);

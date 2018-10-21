import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteDialog extends Component {
  render() {
    const { deleteMsg } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.opened}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            Usunąć wybraną kartę?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {deleteMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.props.onConfirm} color="primary" autoFocus>
              Usuń
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  deleteMsg: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default DeleteDialog;

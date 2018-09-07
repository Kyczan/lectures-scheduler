import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


class PreparedDialog extends Component {
  
  render() {
    const { fullScreen } = this.props;

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
              Przygotowane wykłady
            </DialogTitle>
            <DialogContent style={{ overflow: 'visible' }}>
            oko
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary" autoFocus>
                Zamknij
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

PreparedDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  prepared: PropTypes.array.isRequired,
  lectures: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
};

export default withMobileDialog()(PreparedDialog);

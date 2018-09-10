import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';

class AddLectureDialog extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
      toReturn: {
        number: null,
        title: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const hasDefaults = this.props.lecture.title ? true : false;
    if (hasDefaults) {
      if (prevProps.lecture.id !== this.props.lecture.id) {
        this.setState({
          error: {},
          toReturn: {
            number: this.props.lecture.number || null,
            title: this.props.lecture.title || null,
            id: this.props.lecture.id
          }
        });
      }
    } else {
      if (prevProps.lecture.id && !this.props.lecture.id) {
        const toReturn = { ...this.state.toReturn };
        delete toReturn.id;
        this.setState({
          error: {},
          toReturn: {
            ...toReturn,
            number: null,
            title: null
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
    this.props.onSubmitLecture(this.state.toReturn);
  };

  render() {
    const { fullScreen, lecture } = this.props;

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
          fullWidth
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="responsive-dialog-title">
              {lecture.title ? 'Edytuj wykład' : 'Dodaj nowy wykład'}
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
                  defaultValue={lecture.number || null}
                  helperText={
                    this.state.error.number ? 'Numer jest wymagany' : ''
                  }
                />
                <div className="divider" />
                <TextField
                  required
                  error={this.state.error.title}
                  id="title"
                  label="Tytuł"
                  fullWidth
                  onChange={this.handleFormChange('title')}
                  defaultValue={lecture.title || null}
                  helperText={
                    this.state.error.title ? 'Tytuł jest wymagany' : ''
                  }
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Anuluj
              </Button>
              <Button
                type="submit"
                color="primary"
                autoFocus
                disabled={handleDisabled()}
              >
                Zapisz
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

AddLectureDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onSubmitLecture: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  lecture: PropTypes.object.isRequired
};

export default withMobileDialog()(AddLectureDialog);

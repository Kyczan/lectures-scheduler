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

class AddLectureDialog extends Component {
  constructor() {
    super();
    this.state = {
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
              {lecture.title ? 'Edytuj wykład' : 'Dodaj nowy wykład'}
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
                    defaultValue={lecture.number || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="title">Tytuł</InputLabel>
                  <Input
                    id="title"
                    name="title"
                    onChange={this.handleFormChange('title')}
                    defaultValue={lecture.title || null}
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

AddLectureDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onSubmitLecture: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  lecture: PropTypes.object.isRequired
};

export default withMobileDialog()(AddLectureDialog);

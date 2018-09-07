import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SelectData from '../utils/selectData';
import TextField from '@material-ui/core/TextField';

class AddSpeakerDialog extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
      toReturn: {
        congregation_id: null,
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        privilege: null,
        note: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const hasDefaults = this.props.speaker.id ? true : false;
    if (hasDefaults) {
      if (prevProps.speaker.id !== this.props.speaker.id) {
        this.setState({
          error: {},
          toReturn: {
            congregation_id: this.props.speaker.congregation_id || null,
            first_name: this.props.speaker.first_name || null,
            last_name: this.props.speaker.last_name || null,
            phone: this.props.speaker.phone || null,
            email: this.props.speaker.email || null,
            privilege: this.props.speaker.privilege || null,
            note: this.props.speaker.note || null,
            id: this.props.speaker.id
          }
        });
      }
    } else {
      if (prevProps.speaker.id && !this.props.speaker.id) {
        const toReturn = { ...this.state.toReturn };
        delete toReturn.id;
        this.setState(
          {
            error: {},
            toReturn: {
              ...toReturn,
              congregation_id: null,
              first_name: null,
              last_name: null,
              phone: null,
              email: null,
              privilege: null,
              note: null
            }
          }
        );
      }
    }
  }

  handleSelect = field => value => {
    const id = value && value.id ? value.id : null;
    this.setState({
      toReturn: {
        ...this.state.toReturn,
        [field]: id
      }
    });
  };

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

  validateEmail = e => {
    let error = false;
    if(e.target.value && !/\S+@\S+\.\S+/.test(e.target.value)) {
      error = true;
    }
    this.setState({
      error: {
        ...this.state.error,
        email: error
      },
      toReturn: {
        ...this.state.toReturn,
        email: e.target.value
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitSpeaker(this.state.toReturn);
  };

  render() {
    const { fullScreen, congregations, speaker } = this.props;
    const privileges = [
      '?',
      'sługa',
      'starszy',
      'nie usługuje'
    ];
    let defaultCongregation = {};
    let defaultPrivilege = {};

    congregations.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const suggestedCongregations = congregations.map(congregation => {
      return {
        value: congregation,
        label: `${congregation.name} (${congregation.number})`
      };
    });

    if (speaker.congregation_id) {
      defaultCongregation = suggestedCongregations.filter(
        congregation => congregation.value.id === speaker.congregation_id
      )[0];
    }

    const suggestedPrivileges = privileges.map(privilege => {
      return {
        value: {id: privilege},
        label: privilege
      };
    });

    if (speaker.privilege) {
      defaultPrivilege = suggestedPrivileges.filter(
        privilege => privilege.value.id === speaker.privilege
      )[0];
    }

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
              {speaker.id ? 'Edytuj mówcę' : 'Dodaj nowego mówcę'}
            </DialogTitle>
            <DialogContent style={{ overflow: 'visible' }}>
              <div className="form-wrapper">
                <TextField
                  required 
                  error={this.state.error.first_name}
                  id="first_name"
                  label="Imię"
                  fullWidth
                  onChange={this.handleFormChange('first_name')}
                  defaultValue={speaker.first_name || null}
                  helperText={this.state.error.first_name ? 'Imię jest wymagane' : ''}
                />
                <div className="divider" />
                <TextField
                  required 
                  error={this.state.error.last_name}
                  id="last_name"
                  label="Nazwisko"
                  fullWidth
                  onChange={this.handleFormChange('last_name')}
                  defaultValue={speaker.last_name || null}
                  helperText={this.state.error.last_name ? 'Nazwisko jest wymagane' : ''}
                />
                <div className="divider" />
                <SelectData
                  suggestions={suggestedCongregations}
                  label="Zbór"
                  handleSelect={this.handleSelect('congregation_id')}
                  defaultValue={defaultCongregation}
                />
                <div className="divider" />
                <SelectData
                  suggestions={suggestedPrivileges}
                  label="Przywilej"
                  handleSelect={this.handleSelect('privilege')}
                  defaultValue={defaultPrivilege}
                />
                <div className="divider" />
                <TextField
                  error={this.state.error.email}
                  id="email"
                  type="email"
                  label="Email"
                  fullWidth
                  onBlur={this.validateEmail}
                  defaultValue={speaker.email || null}
                  helperText={this.state.error.email ? 'Email jest niepoprawny' : ''}
                />
                <div className="divider" />
                <TextField
                  id="phone"
                  label="Telefon"
                  fullWidth
                  onChange={this.handleFormChange('phone')}
                  defaultValue={speaker.phone || null}
                />
                <div className="divider" />
                <TextField
                  id="note"
                  label="Uwagi"
                  fullWidth
                  onChange={this.handleFormChange('note')}
                  defaultValue={speaker.note || null}
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

AddSpeakerDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  congregations: PropTypes.array.isRequired,
  onSubmitSpeaker: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  speaker: PropTypes.object.isRequired
};

export default withMobileDialog()(AddSpeakerDialog);

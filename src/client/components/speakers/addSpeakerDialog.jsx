import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SelectData from '../utils/selectData';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class AddSpeakerDialog extends Component {
  constructor() {
    super();
    this.state = {
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
      toReturn: {
        ...this.state.toReturn,
        [field]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmitSpeaker(this.state.toReturn);
  };

  render() {
    const { fullScreen, congregations, speaker } = this.props;
    let defaultCongregation = {};

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
                <FormControl className="input-data">
                  <InputLabel htmlFor="first_name">Imię</InputLabel>
                  <Input
                    id="first_name"
                    name="first_name"
                    onChange={this.handleFormChange('first_name')}
                    defaultValue={speaker.first_name || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="last_name">Nazwisko</InputLabel>
                  <Input
                    id="last_name"
                    name="last_name"
                    onChange={this.handleFormChange('last_name')}
                    defaultValue={speaker.last_name || null}
                  />
                </FormControl>
                <div className="divider" />
                <SelectData
                  suggestions={suggestedCongregations}
                  label="Zbór"
                  handleSelect={this.handleSelect('congregation_id')}
                  defaultValue={defaultCongregation}
                />
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="privilege">Przywilej</InputLabel>
                  <Input
                    id="privilege"
                    name="privilege"
                    onChange={this.handleFormChange('privilege')}
                    defaultValue={speaker.privilege || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    onChange={this.handleFormChange('email')}
                    defaultValue={speaker.email || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="phone">Telefon</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    onChange={this.handleFormChange('phone')}
                    defaultValue={speaker.phone || null}
                  />
                </FormControl>
                <div className="divider" />
                <FormControl className="input-data">
                  <InputLabel htmlFor="notes">Uwagi</InputLabel>
                  <Input
                    id="note"
                    name="note"
                    onChange={this.handleFormChange('note')}
                    defaultValue={speaker.note || null}
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

AddSpeakerDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  congregations: PropTypes.array.isRequired,
  onSubmitSpeaker: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  speaker: PropTypes.object.isRequired
};

export default withMobileDialog()(AddSpeakerDialog);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { newPrepared, deletePrepared } from '../../actions/preparedActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectData from '../utils/selectData';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/AddCircle';

class PreparedDialog extends Component {
  constructor() {
    super();
    this.state = {
      selectedLecture: null,
      addingPrepared: false,
      deletingPrepared: false
    };
  }

  handleDelete = async item => {
    await this.setState({ deletingPrepared: true });
    await this.props.deletePrepared(item.speaker_id, item.lecture_id);
    this.setState({ deletingPrepared: false });
  };

  handleSelect = value => {
    const id = value && value.id ? value.id : null;
    this.setState({
      ...this.state,
      selectedLecture: id
    });
  };

  handleAdd = async () => {
    const { selectedLecture } = this.state;
    const { speaker } = this.props;
    const preparedData = {
      lecture_id: selectedLecture
    };
    if (selectedLecture) {
      await this.setState({ addingPrepared: true });
      await this.props.newPrepared(speaker.id, preparedData);
      this.setState({ addingPrepared: false });
    }
  };

  render() {
    const { fullScreen, prepared, lectures } = this.props;

    prepared.sort((a, b) => {
      return a.number - b.number;
    });

    lectures.sort((a, b) => {
      return a.number - b.number;
    });

    const suggestedLectures = lectures.map(lecture => ({
      value: lecture,
      label: `${lecture.number}. ${lecture.title}`
    }));

    const preparedItems = prepared.map(item => {
      const lastLecture = item.last_lecture_date
        ? `Zbór: ${item.last_lecture_date}`
        : '';
      const lastSpeaker = item.last_speaker_lecture_date
        ? `Mówca: ${item.last_speaker_lecture_date}`
        : '';
      const separator = lastLecture && lastSpeaker ? ' | ' : '';
      return (
        <ListItem key={item.lecture_id}>
          <ListItemText
            primary={`${item.number}. ${item.title}`}
            secondary={`${lastLecture}${separator}${lastSpeaker}`}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Usuń"
              onClick={() => this.handleDelete(item)}
              disabled={this.state.deletingPrepared}
            >
              <DeleteIcon
                className={this.state.deletingPrepared ? 'spinner' : ''}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

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
              Przygotowane wykłady
            </DialogTitle>
            <DialogContent style={{ overflow: 'visible' }}>
              <List>
                {preparedItems}
                <div className="divider" />
                <ListItem className="add-prepared">
                  <SelectData
                    suggestions={suggestedLectures}
                    label="Dodaj wykład"
                    handleSelect={this.handleSelect}
                    defaultValue={{}}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Dodaj"
                      onClick={this.handleAdd}
                      disabled={this.state.addingPrepared}
                    >
                      <AddIcon
                        className={this.state.addingPrepared ? 'spinner' : ''}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
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
  newPrepared: PropTypes.func.isRequired,
  deletePrepared: PropTypes.func.isRequired,
  prepared: PropTypes.array.isRequired,
  lectures: PropTypes.array.isRequired,
  speaker: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  newPrepared,
  deletePrepared
};

export default compose(
  withMobileDialog(),
  connect(mapStateToProps, mapDispatchToProps)
)(PreparedDialog);

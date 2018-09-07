import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  newPrepared,
  deletePrepared
} from '../../actions/preparedActions';
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
import {
  Delete as DeleteIcon,
  AddBox as AddIcon
} from '@material-ui/icons';

class PreparedDialog extends Component {

  constructor() {
    super();
    this.state = {
      selectedLecture: null
    };
  }

  handleDelete = item => {
    this.props.deletePrepared(item.speaker_id, item.lecture_id);
  }

  handleSelect = value => {
    const id = value && value.id ? value.id : null;
    this.setState({
      ...this.state,
      selectedLecture: id
    });
  };

  handleAdd = () => {
    const { selectedLecture } = this.state;
    const { speaker } = this.props;
    const preparedData = {
      lecture_id: selectedLecture
    };
    if(selectedLecture) this.props.newPrepared(speaker.id, preparedData);
  }

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

    const preparedItems = prepared.map(item => (
      <ListItem key={item.lecture_id}>
        <ListItemText
          primary={`${item.number}. ${item.title}`}
          secondary={`Zbór: ${item.last_lecture_date} Mówca: ${item.last_speaker_lecture_date}`}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Usuń" onClick={() => this.handleDelete(item)} >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

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
                    <IconButton aria-label="Dodaj" onClick={this.handleAdd} >
                      <AddIcon />
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
  opened: PropTypes.bool.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  newPrepared,
  deletePrepared
};

export default compose(
  withMobileDialog(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PreparedDialog);

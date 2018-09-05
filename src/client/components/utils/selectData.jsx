/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      Brak wyników
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    />
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  ValueContainer,
  Menu
};

class SelectData extends React.Component {

  constructor(props) {
    super(props);
    const defaultValue = props.defaultValue;
    const hasDefaults = defaultValue.label ? true : false;
    const selected = {
      value: null,
      label: null
    };
    this.state = {
      selected: hasDefaults ? defaultValue : selected,
      shouldShrink: hasDefaults
    };
  }

  handleChange = () => selected => {
    this.setState({
      selected,
      shouldShrink: true
    });
    this.props.handleSelect(selected.value);
  };
  handleFocus = () => {
    this.setState({
      shouldShrink: true
    });
  };
  handleBlur = () => {
    this.setState({
      shouldShrink: this.state.selected.value ? true : false
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
      })
    };

    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          styles={selectStyles}
          options={this.props.suggestions}
          components={components}
          value={this.state.selected}
          onChange={this.handleChange()}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          textFieldProps={{
            label: this.props.label,
            InputLabelProps: {
              shrink: this.state.shouldShrink
            }
          }}
        />
      </div>
    );
  }
}

SelectData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  suggestions: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  defaultValue: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SelectData);

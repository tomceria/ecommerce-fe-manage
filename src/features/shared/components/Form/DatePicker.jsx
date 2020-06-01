import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import { Controller } from "react-hook-form";

import {
  DatePicker as MUIDatePicker,
  DateTimePicker as MUIDateTimePicker
} from "@material-ui/pickers";

// AUX
const PickerComponent = props => {
  const { type } = props;
  let NewComponent = null;
  switch (type) {
    default:
    case "date": {
      NewComponent = MUIDatePicker;
      break;
    }
    case "datetime": {
      NewComponent = MUIDateTimePicker;
      break;
    }
  }
  return <NewComponent {...props} type={undefined} />; // eslint-disable-line
};

// Main Component
const DatePicker = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  rules,
  defaultValue,
  // DatePicker properties
  type,
  // Additional Props
  errormessage,
  disabled,
  // Handlers
  changed,
  // Others
  style,
  className
}) => {
  const getMomentDateOnly = momentObj => {
    const newMoment = moment(momentObj.valueOf());
    newMoment.millisecond(0);
    newMoment.second(0);
    newMoment.minute(0);
    newMoment.hour(0);
    return newMoment;
  };

  const handleOnChange = e => {
    if (changed) {
      changed(e);
    }
    let newMoment = e;
    if (type === "date") {
      newMoment = getMomentDateOnly(newMoment);
    }
    return newMoment.toISOString();
  };

  return (
    <Controller
      as={<DatePickerStyled type={type} />} // eslint-disable-line
      // Form Identifier
      name={name}
      label={label}
      // react-hook-form Props
      error={error}
      control={control}
      rules={rules}
      defaultValue={
        // eslint-disable-next-line
        defaultValue
          ? moment(defaultValue)
          : type === "date"
          ? getMomentDateOnly(moment())
          : moment()
      }
      // Stylings
      variant="inline"
      inputVariant="outlined"
      // Others
      disabled={disabled}
      style={style}
      helperText={error && errormessage}
      onChange={([event]) => handleOnChange(event)}
      className={className}
    />
  );
};

export default DatePicker;

// PropTypes
DatePicker.propTypes = {
  // Form Identifier
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // react-hook-form Props
  control: PropTypes.shape({}).isRequired,
  rules: PropTypes.shape({}),
  defaultValue: PropTypes.string,
  // DatePicker properties
  type: PropTypes.string,
  // Handlers
  changed: PropTypes.func,
  // Additional Props
  errormessage: PropTypes.string,
  // Others
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  error: PropTypes.bool,
  className: PropTypes.string
};
DatePicker.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  type: "date",
  disabled: false,
  style: {},
  error: undefined,
  errormessage: "",
  changed: () => {},
  className: ""
};
PickerComponent.propTypes = {
  type: PropTypes.string.isRequired
};

// Styles
const DatePickerStyled = styled(PickerComponent)`
  & .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 0.657rem 0.875rem;
  }
`;

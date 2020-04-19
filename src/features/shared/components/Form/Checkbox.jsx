import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormControlLabel, Checkbox as MaterialCheckbox } from "@material-ui/core";

const Checkbox = ({ label, name, className, inputRef, disabled }) => {
  return (
    <CheckboxCtn
      className={className}
      control={
        <MaterialCheckbox
          label={label}
          name={name}
          className={className}
          inputRef={inputRef}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;

// PropTypes
Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
Checkbox.defaultProps = {
  inputRef: () => {},
  disabled: false,
  className: ""
};

// Styles
const CheckboxCtn = styled(FormControlLabel)``;

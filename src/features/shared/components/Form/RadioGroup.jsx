import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Controller } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as RadioGroupMUI
} from "@material-ui/core";

const RadioGroup = ({ name, label, control, defaultValue, selections, changed, disabled }) => {
  const handleOnChange = e => {
    if (changed) {
      changed(e);
    }
    return e.target.value;
  };

  return (
    <FormControlStyled component="fieldset" disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        // Form Identifier
        name={name}
        // react-hook-form Props
        control={control}
        defaultValue={defaultValue}
        onChange={([event]) => handleOnChange(event)}
        as={
          <RadioGroupMUI aria-label={name}>
            {selections.map(opt => (
              <FormControlLabel key={opt.id} value={opt.id} control={<Radio />} label={opt.name} />
            ))}
          </RadioGroupMUI>
        }
      />
    </FormControlStyled>
  );
};

export default RadioGroup;

// PropTypes
RadioGroup.propTypes = {
  // Form Identifier
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // react-hook-form Props
  control: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.string,
  // Selections
  selections: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    PropTypes.func
  ]).isRequired,
  // Handlers
  changed: PropTypes.func,
  disabled: PropTypes.bool
};
RadioGroup.defaultProps = {
  // react-hook-form Props
  defaultValue: undefined,
  // Handlers
  changed: () => {},
  disabled: false
};

// Styles
const FormControlStyled = styled(FormControl)``;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Controller } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup as RadioGroupMUI
} from "@material-ui/core";

import { colors } from "../../../../styles/variables/colors.style";

const RadioGroup = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  rules,
  defaultValue,
  // Additional Props
  selections,
  errormessage,
  changed,
  disabled
}) => {
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
        rules={rules}
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
      <FormHelperText>{error && errormessage}</FormHelperText>
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
  error: PropTypes.bool,
  control: PropTypes.shape({}).isRequired,
  rules: PropTypes.shape({}),
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
  // Additional Props
  errormessage: PropTypes.string,
  // Handlers
  changed: PropTypes.func,
  disabled: PropTypes.bool
};
RadioGroup.defaultProps = {
  // react-hook-form Props
  error: undefined,
  rules: undefined,
  defaultValue: undefined,
  // Additional Props
  errormessage: undefined,
  // Handlers
  changed: () => {},
  disabled: false
};

// Styles
const FormControlStyled = styled(FormControl)`
  & .MuiFormHelperText-root {
    color: ${colors.scheme.error.normal};
  }
`;

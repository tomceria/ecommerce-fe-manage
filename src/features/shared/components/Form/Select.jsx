import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  Select as MaterialSelect,
  FormHelperText
} from "@material-ui/core";
import { Controller } from "react-hook-form";

import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import speed from "../../../../styles/variables/speed.style";

const Select = ({
  name,
  label,
  error,
  control,
  rules,
  defaultValue,
  errormessage,
  changed,
  touched,
  disabled,
  selections,
  selectableParent,
  childrenAlias,
  style,
  className
}) => {
  const handleOnChange = e => {
    if (changed) {
      changed(e);
    }
    return e.target.value;
  };

  return (
    <FormControlStyled
      variant="outlined"
      disabled={disabled}
      style={style}
      className={className}
      error={error}
    >
      <InputLabel shrink={!!touched}>{label}</InputLabel>
      <Controller
        // Form Identifier
        name={name}
        // react-hook-form Props
        control={control}
        error={error}
        defaultValue={defaultValue}
        rules={rules}
        onChange={([event]) => handleOnChange(event)}
        as={
          <MaterialSelect native onChange={handleOnChange} inputProps={{ errormessage }}>
            {selections.map(opt =>
              opt[childrenAlias] && opt[childrenAlias].length > 0 ? (
                <optgroup key={opt.id} label={opt.name}>
                  <option value={opt.id}>
                    {(selectableParent.prefix || "") + opt.name + (selectableParent.suffix || "")}
                  </option>
                  {opt[childrenAlias].map(childOpt => (
                    <option key={childOpt.id} value={childOpt.id}>
                      {childOpt.name}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              )
            )}
          </MaterialSelect>
        }
      />
      <FormHelperText>{error && errormessage}</FormHelperText>
    </FormControlStyled>
  );
};

export default Select;

// PropTypes
Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.shape({}).isRequired,
  rules: PropTypes.shape({}),
  defaultValue: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  selections: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    PropTypes.func
  ]).isRequired,
  selectableParent: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      prefix: PropTypes.string,
      suffix: PropTypes.string
    })
  ]),
  childrenAlias: PropTypes.string,
  style: PropTypes.shape({}),
  error: PropTypes.bool,
  errormessage: PropTypes.string,
  changed: PropTypes.func,
  className: PropTypes.string
};
Select.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  touched: undefined,
  disabled: false,
  selectableParent: undefined,
  childrenAlias: undefined,
  style: {},
  error: undefined,
  errormessage: "",
  changed: () => {},
  className: ""
};

// Styles
const FormControlStyled = styled(FormControl)`
  & > .MuiFormLabel-root,
  & > .MuiInputBase-root {
    transition: ${speed.trans} ease-out;
    background-color: transparent;
  }
  & > .MuiFormLabel-root.Mui-disabled,
  & > .MuiInputBase-root.Mui-disabled {
    transition: ${speed.trans} ease-out;
    transition-property: background-color;
    background-color: ${colors.gray.light};
  }

  & > .MuiInputBase-root .MuiSelect-root {
    overflow: hidden;
  }

  & .MuiInputLabel-outlined {
    background: ${colors.white};
    transform: translate(14px, 12px) scale(1);
    width: ${remScale(100)};
  }

  & div.Mui-focused {
    background: ${colors.white} !important;
  }

  & .MuiOutlinedInput-root.Mui-error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
  }

  & select {
    padding: ${remScale(10)} 0 ${remScale(11)} ${remScale(14)};
  }
`;

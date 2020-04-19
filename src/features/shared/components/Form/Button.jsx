import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button as MaterialButton } from "@material-ui/core";

const Button = ({ type, color, startIcon, endIcon, disabled, style, className, children }) => {
  return (
    <ButtonCtn
      type={type}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      style={style}
      className={className}
      variant="contained"
    >
      {children}
    </ButtonCtn>
  );
};

export default Button;

// PropTypes
Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
Button.defaultProps = {
  type: "button",
  color: null,
  startIcon: null,
  endIcon: null,
  disabled: false,
  style: {},
  className: ""
};

// Styles
const ButtonCtn = styled(MaterialButton)`
  line-height: 2 !important;

  & svg {
    transform: scale(1.5) !important;
  }
`;

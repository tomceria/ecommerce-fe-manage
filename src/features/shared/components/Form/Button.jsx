import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button as MaterialButton } from "@material-ui/core";

const Button = React.forwardRef(function Button(props, ref) {
  const { type, color, startIcon, endIcon, disabled, onClick, style, className, children } = props;

  return (
    <ButtonCtn
      type={type}
      color={color || "default"}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={className}
      variant="contained"
      ref={ref}
    >
      {children}
    </ButtonCtn>
  );
});

export default Button;

// PropTypes
Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element]))
  ]).isRequired
};
Button.defaultProps = {
  type: "button",
  color: undefined,
  startIcon: null,
  endIcon: null,
  disabled: undefined,
  onClick: undefined,
  style: {},
  className: ""
};

// Styles
const ButtonCtn = styled(MaterialButton)`
  line-height: 2 !important;

  & svg {
    transform: scale(1.5) !important;
    margin-right: 0.5rem;
  }
`;

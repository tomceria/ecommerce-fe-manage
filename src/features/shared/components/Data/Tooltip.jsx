import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip as TooltipMUI } from "@material-ui/core";

const Tooltip = ({ title, interactive, children }) => {
  return (
    <TooltipStyled title={title} interactive={interactive}>
      {children}
    </TooltipStyled>
  );
};

export default Tooltip;

// PropTypes
Tooltip.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  interactive: PropTypes.bool,
  children: PropTypes.element.isRequired
};
Tooltip.defaultProps = {
  interactive: undefined
};

// Styles
const TooltipStyled = styled(TooltipMUI)``;

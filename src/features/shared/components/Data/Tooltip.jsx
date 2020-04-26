import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip as TooltipMUI } from "@material-ui/core";

const Tooltip = ({ title, children }) => {
  return <TooltipStyled title={title}>{children}</TooltipStyled>;
};

export default Tooltip;

// PropTypes
Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

// Styles
const TooltipStyled = styled(TooltipMUI)``;

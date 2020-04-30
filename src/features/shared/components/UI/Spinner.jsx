import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Spinner = ({ color, style, className }) => {
  return <CircularProgress color={color} style={style} className={className} />;
};

export default Spinner;

// PropTypes
Spinner.propTypes = {
  color: PropTypes.string,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
Spinner.defaultProps = {
  color: undefined,
  style: undefined,
  className: undefined
};

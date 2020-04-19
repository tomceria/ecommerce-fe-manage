import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert as MaterialAlert } from "@material-ui/lab";

const Alert = ({ severity, children }) => {
  return (
    <AlertCtn severity={severity} variant="filled">
      {children}
    </AlertCtn>
  );
};

export default Alert;

// PropTypes
Alert.propTypes = {
  severity: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

// Styles
const AlertCtn = styled(MaterialAlert)``;

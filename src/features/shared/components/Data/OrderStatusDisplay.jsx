import React from "react";
import PropTypes from "prop-types";
import { colors } from "../../../../styles/variables/colors.style";

import Tooltip from "./Tooltip";

const NumberDisplay = ({ status }) => {
  const statusColor = statusId => {
    switch (statusId) {
      case "processing":
      case "ordered": {
        return colors.scheme.warning.dark;
      }
      case "verified":
      case "delivered": {
        return colors.scheme.success.normal;
      }
      case "canceled":
      case "rejected":
      default: {
        return colors.scheme.error.normal;
      }
    }
  };

  return (
    <Tooltip title={`Status ID: ${status.id}`} interactive>
      <span style={{ color: statusColor(status.id) }}>{status.name}</span>
    </Tooltip>
  );
};

export default NumberDisplay;

// PropTypes
NumberDisplay.propTypes = {
  status: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired
};

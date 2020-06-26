import React from "react";
import PropTypes from "prop-types";
import { colors } from "../../../../styles/variables/colors.style";

import Tooltip from "./Tooltip";

const SupportTicketStatusDisplay = ({ status }) => {
  const statusColor = statusId => {
    switch (statusId) {
      case "pending":
      case "inprogress": {
        return colors.scheme.warning.dark;
      }
      case "solved": {
        return colors.scheme.success.normal;
      }
      case "closed":
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

export default SupportTicketStatusDisplay;

// PropTypes
SupportTicketStatusDisplay.propTypes = {
  status: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired
};

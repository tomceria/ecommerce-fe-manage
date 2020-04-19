import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const DateDisplay = ({ value }) => {
  return (
    <span>
      {moment(value)
        .tz("Asia/Ho_Chi_Minh")
        .format("DD/MM/YYYY HH:mm:ss")}
    </span>
  );
};

export default DateDisplay;

// PropTypes
DateDisplay.propTypes = {
  value: PropTypes.string.isRequired
};

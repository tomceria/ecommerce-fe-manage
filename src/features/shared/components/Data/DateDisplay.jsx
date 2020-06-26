import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const DateDisplay = ({ value, isDate }) => {
  const format = isDate ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm:ss";

  return (
    <span> {/* eslint-disable-line */}
      {moment(value)
        .tz("Asia/Ho_Chi_Minh")
        .format(format)}
    </span>
  );
};

export default DateDisplay;

export const dateDisplayString = value => {
  return moment(value)
    .tz("Asia/Ho_Chi_Minh")
    .format("DD/MM/YYYY HH:mm:ss");
};

// PropTypes
DateDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  isDate: PropTypes.bool
};
DateDisplay.defaultProps = {
  isDate: undefined
};

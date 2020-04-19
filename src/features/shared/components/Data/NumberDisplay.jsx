import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberDisplay = ({ type, value }) => {
  return (
    <>
      {type === "currency" && (
        <NumberFormat value={value} displayType="text" suffix="₫" thousandSeparator />
      )}
    </>
  );
};

export default NumberDisplay;

// PropTypes
NumberDisplay.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

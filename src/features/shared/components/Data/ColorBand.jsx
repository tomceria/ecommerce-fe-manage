import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isHexColor } from "validator";
import { colors, alpha } from "../../../../styles/variables/colors.style";

const ColorBand = ({ colors }) => {
  const formattedColors = colors
    ? colors
        .split(",")
        .filter(c => isHexColor(c))
        .map(c => c.split("#").slice(-1))
    : [];

  return (
    <ColorBandStyled>
      {formattedColors.map((color, index) => (
        <ColorStripe key={`${color}_${index}`} color={color} className="stripe" /> // eslint-disable-line
      ))}
    </ColorBandStyled>
  );
};

export default ColorBand;

// PropTypes
ColorBand.propTypes = {
  colors: PropTypes.string
};
ColorBand.defaultProps = {
  colors: undefined
};

// Styles
const ColorBandStyled = styled.div`
  min-width: 10rem;
  display: flex;
  flex-direction: row;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 0.1em solid ${`${colors.white}${alpha(50)}`};
  }
`;
const ColorStripe = styled.div`
  flex-grow: 1;
  background-color: #${props => props.color};
`;

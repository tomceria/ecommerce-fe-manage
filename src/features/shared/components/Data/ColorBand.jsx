import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isHexColor } from "validator";
import { colors, alpha } from "../../../../styles/variables/colors.style";

const ColorBand = ({ colorsString, style }) => {
  const formattedColors = colorsString
    ? colorsString
        .split(",")
        .filter(c => isHexColor(c))
        .map(c => c.split("#").slice(-1))
    : [];

  return (
    <ColorBandStyled style={style}>
      {formattedColors.map((color, index) => (
        <ColorStripe key={`${color}_${index}`} color={color} className="stripe" /> // eslint-disable-line
      ))}
    </ColorBandStyled>
  );
};

export default ColorBand;

// PropTypes
ColorBand.propTypes = {
  colorsString: PropTypes.string,
  style: PropTypes.shape({})
};
ColorBand.defaultProps = {
  colorsString: undefined,
  style: undefined
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
    border: 0.1em solid ${`${colors.gray.darker}${alpha(50)}`};
  }
`;
const ColorStripe = styled.div`
  flex-grow: 1;
  background-color: #${props => props.color};
`;

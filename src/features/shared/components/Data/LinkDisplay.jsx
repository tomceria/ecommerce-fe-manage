import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../../styles/variables/colors.style";

const LinkDisplay = ({ to, weight, children }) => {
  return (
    <>
      {to && (
        <LinkStyled to={to} weight={weight || 400}>
          <span>{children}</span>
        </LinkStyled>
      )}
    </>
  );
};

export default LinkDisplay;

// PropTypes
LinkDisplay.propTypes = {
  to: PropTypes.string.isRequired,
  weight: PropTypes.number,
  children: PropTypes.string
};
LinkDisplay.defaultProps = {
  weight: 400,
  children: ""
};

// Styles
const LinkStyled = styled(Link)`
  font-weight: ${props => props.weight};
  color: ${colors.scheme.secondary.normal};
`;

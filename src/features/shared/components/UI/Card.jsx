import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import stylings from "../../../../styles/stylings/stylings.style";
import { colors } from "../../../../styles/variables/colors.style";
import { scaling } from "../../../../styles/variables/size.style";
import { isDesktop } from "../../../../utils/responsive.util";
import Fade from "../Transitions/Fade";

const Card = ({
  width,
  height,
  background,
  padding,
  marginVert,
  marginSide,
  shadow,
  className,
  style,
  children
}) => {
  return (
    <Fade in>
      <CardContainer
        className={className}
        style={style}
        width={width}
        height={height}
        background={background || colors.white}
        padding={padding && scaling(padding)}
        marginVert={marginVert && scaling(marginVert)}
        marginSide={marginSide && scaling(marginSide)}
        shadow={shadow && stylings.boxShadow[shadow]}
      >
        {children}
      </CardContainer>
    </Fade>
  );
};

export default Card;

// PropTypes

Card.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  background: PropTypes.string,
  padding: PropTypes.string,
  marginVert: PropTypes.string,
  marginSide: PropTypes.string,
  shadow: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};
Card.defaultProps = {
  width: undefined,
  height: undefined,
  background: undefined,
  padding: undefined,
  marginVert: undefined,
  marginSide: undefined,
  shadow: undefined,
  className: "",
  style: {},
  children: null
};

// Additional reuseable components

const LayoutCard = ({ className, style, children }) => (
  <Card
    className={className}
    style={style}
    marginVert={isDesktop(useMediaQuery) ? "md" : "sm"}
    padding="md"
    shadow="low"
  >
    {children}
  </Card>
);
LayoutCard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};
LayoutCard.defaultProps = {
  className: "",
  style: {},
  children: null
};

export { LayoutCard };

// Styles
const CardContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.background};
  padding: ${props => props.padding};
  margin: ${props => props.marginVert || 0} ${props => props.marginSide || 0};
  ${props => props.shadow};
  ${stylings.borderRadius.sm};

  & > .title {
    margin: 0 0 1rem 0;
  }
`;

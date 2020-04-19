import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Fade from "../Transitions/Fade";
import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";

const LoadScreen = ({ in: isIn, background, mover, moverHeight, className }) => {
  return (
    <Fade in={isIn} mountOnEnter unmountOnExit>
      <LoadScreenCtn
        className={className}
        background={background || colors.white}
        mover={mover || colors.gray.offwhite}
        moverHeight={moverHeight || 200}
      >
        <div className="mover" />
      </LoadScreenCtn>
    </Fade>
  );
};

export default LoadScreen;

// PropTypes
LoadScreen.propTypes = {
  in: PropTypes.bool.isRequired,
  background: PropTypes.string,
  mover: PropTypes.string,
  moverHeight: PropTypes.number,
  className: PropTypes.string
};
LoadScreen.defaultProps = {
  background: undefined,
  mover: undefined,
  moverHeight: undefined,
  className: ""
};

// Styles
const LoadScreenCtn = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${props => props.background};

  .mover {
    width: inherit;
    height: ${props => remScale(props.moverHeight)};
    position: absolute;
    background: linear-gradient(
      180deg,
      ${props => props.background} 0%,
      ${props => props.mover} 50%,
      ${props => props.background} 100%
    );
    animation-name: loadscreen;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes loadscreen {
    0% {
      top: 0%;
      opacity: 0;
    }
    45% {
      opacity: 1;
    }
    55% {
      opacity: 1;
    }
    100% {
      top: calc(100% - ${props => remScale(props.moverHeight)});
      opacity: 0;
    }
  }
`;

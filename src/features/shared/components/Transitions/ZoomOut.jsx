import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const ZoomOut = ({ in: isIn, mountOnEnter, unmountOnExit, timeout, children }) => {
  return (
    <TransitionCtn
      in={isIn}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
    >
      {children}
    </TransitionCtn>
  );
};

export default ZoomOut;

// PropTypes
ZoomOut.propTypes = {
  in: PropTypes.bool.isRequired,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  timeout: PropTypes.number,
  children: PropTypes.element.isRequired
};
ZoomOut.defaultProps = {
  mountOnEnter: undefined,
  unmountOnExit: undefined,
  timeout: 150
};

// Styles
const TransitionCtn = styled(CSSTransition)`
  &.enter {
    transform: scale(1.1, 1.1);
  }
  &.enter-active {
    transform: scale(1, 1);
    opacity: 1;
    transition: all ${props => props.timeout}ms;
  }
  &.exit {
    transform: scale(1, 1);
    opacity: 1;
  }
  &.exit-active {
    transform: scale(1.1, 1.1);
    opacity: 0;
    transition: all ${props => props.timeout}ms;
  }
`;

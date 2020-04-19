import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const SlideInRight = ({ in: isIn, mountOnEnter, unmountOnExit, timeout, children }) => {
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

export default SlideInRight;

// PropTypes
SlideInRight.propTypes = {
  in: PropTypes.bool.isRequired,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  timeout: PropTypes.number,
  children: PropTypes.element.isRequired
};
SlideInRight.defaultProps = {
  mountOnEnter: undefined,
  unmountOnExit: undefined,
  timeout: 150
};

// Styles
const TransitionCtn = styled(CSSTransition)`
  &.enter {
    transform: translateX(200%);
  }
  &.enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all ${props => props.timeout}ms;
  }
  &.exit {
    transform: translateX(0%);
    opacity: 1;
  }
  &.exit-active {
    transform: translateX(200%);
    opacity: 0;
    transition: all ${props => props.timeout}ms;
  }
`;

import React from "react";
import PropTypes from "prop-types";
import { Fade as MaterialFade } from "@material-ui/core";

const Fade = ({ in: isIn, mountOnEnter, unmountOnExit, timeout, children }) => {
  return (
    <MaterialFade
      in={isIn}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
    >
      {children}
    </MaterialFade>
  );
};

export default Fade;

// PropTypes
Fade.propTypes = {
  in: PropTypes.bool.isRequired,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  timeout: PropTypes.number,
  children: PropTypes.element.isRequired
};
Fade.defaultProps = {
  mountOnEnter: undefined,
  unmountOnExit: undefined,
  timeout: 150
};

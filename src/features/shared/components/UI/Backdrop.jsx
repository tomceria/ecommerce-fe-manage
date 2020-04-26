import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TransCtn from "../Transitions/Fade";

const Backdrop = ({ in: isIn, onClick }) => {
  return (
    <TransCtn in={isIn} mountOnEnter unmountOnExit>
      <BackdropStyled onClick={onClick} />
    </TransCtn>
  );
};

export default Backdrop;

// PropTypes
Backdrop.propTypes = {
  in: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

// Styles
const BackdropStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

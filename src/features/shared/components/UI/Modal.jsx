import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconClose from "@iconify/icons-bx/bx-x";

import Backdrop from "./Backdrop";
import TransCtn from "../Transitions/ZoomOut";
import { remScale } from "../../../../styles/variables/size.style";
import { colors, alpha } from "../../../../styles/variables/colors.style";
import stylings from "../../../../styles/stylings/stylings.style";

const Modal = ({ in: isIn, title, onClose, children }) => {
  const content = (
    <>
      <TransCtn in={isIn} mountOnEnter unmountOnExit>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            overflowY: "auto",
            zIndex: 100,
            background: "transparent"
          }}
        >
          <Backdrop in={isIn} onClick={onClose} />
          <ModalStyledContainer>
            <div className="titleCtn">
              <span className="title">{title}</span>
              <button type="button" onClick={onClose} className="close">
                <Icon icon={iconClose} className="icon" />
              </button>
            </div>
            {children}
          </ModalStyledContainer>
        </div>
      </TransCtn>
    </>
  );
  return createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;

// PropTypes
Modal.propTypes = {
  in: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

// Styles
const ModalStyledContainer = styled.div`
  position: relative;
  z-index: 102;
  margin: 4rem auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: ${remScale(900)};
  min-height: calc(100vh - 20%);
  box-shadow: 0 ${remScale(10)} ${remScale(10)} ${colors.gray.darker + alpha(50)};
  padding: ${remScale(16)};
  box-sizing: border-box;
  border-radius: ${remScale(6)};

  @media (max-width: 968px) {
    width: 100vw;
  }

  @media (${stylings.mediaQuery.sm}) {
    margin: 2rem 0;
  }

  & > .titleCtn {
    display: flex;
    justify-content: space-between;
    height: ${remScale(40)};
    margin-bottom: 2rem;
  }

  & > .titleCtn > .title {
    margin: 0;
    font-size: ${remScale(34)};
  }
  @media (${stylings.mediaQuery.sm}) {
    & > .titleCtn > .title {
      font-size: ${remScale(21)};
    }
  }

  & > .titleCtn > .close {
    background: ${colors.gray.dark} !important;
    border-radius: 50%;
    appearance: none !important;
    border: 0 !important;
    padding: 0;
    font: inherit !important;
  }
  & > .titleCtn > .close:hover {
    cursor: pointer;
  }
  & > .titleCtn > .close:focus {
    outline: none !important;
  }

  & > .titleCtn > .close > .icon {
    color: ${colors.white};
    width: ${remScale(40)};
    height: ${remScale(40)};
  }
`;

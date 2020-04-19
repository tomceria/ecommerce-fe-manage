import React from "react";
import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { InlineIcon } from "@iconify/react";
import iconClose from "@iconify/icons-bx/bx-x";

import { selectDrawerState, setDrawer } from "../../reducers";
import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import CoopLogo from "../../../shared/components/Branding/CoopLogo";
import ProfileTouch from "../Profile/ProfileTouch";
import SlideInRight from "../../../shared/components/Transitions/SlideInRight";

const SideDrawer = props => {
  const drawerState = useSelector(selectDrawerState);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(setDrawer({ value: false }));
  };

  const content = (
    <SlideInRight in={drawerState} timeout={200} mountOnEnter unmountOnExit>
      <Drawer>
        <div className="header">
          <CloseBtn onClick={handleCloseDrawer}>
            <InlineIcon icon={iconClose} className="icon" />
          </CloseBtn>
          <div className="logoCtn">
            <CoopLogo forSideDrawer />
          </div>
          <div className="profileCtn">
            <ProfileTouch />
          </div>
        </div>
        <ul className="listWrapper">{props.children}</ul>
      </Drawer>
    </SlideInRight>
  );
  return ReactDOM.createPortal(content, document.getElementById("sidedrawer-hook"));
};

export default SideDrawer;

// Styles
const navBarHeight = remScale(48);
const headerItemPadding = remScale(32);
const profileCtnBottomPadding = remScale(16);
const profileIconHeight = remScale(64);
const Drawer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray.darker};
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 40;

  & ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  & > .header {
    //display: flex;
    //flex-direction: column;
    z-index: 1;
    background-image: url("https://images.unsplash.com/photo-1581508525333-5fe25ad324f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80");
    background-size: cover;
    box-shadow: 0px 5px 5px 2px rgba(35, 35, 35, 0.45);
  }

  & > .header > .logoCtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
    height: ${remScale(112)};
    padding: ${headerItemPadding};
  }

  & > .header > .profileCtn {
    height: calc(${profileIconHeight} + ${profileCtnBottomPadding});
    padding: 0 ${headerItemPadding} ${profileCtnBottomPadding};
  }

  & > .listWrapper {
    overflow-y: auto;
    padding: ${headerItemPadding} ${headerItemPadding};
    padding-bottom: 10rem;
  }

  @media (orientation: landscape) {
    & > .header {
      display: flex;
      flex-direction: row;
      min-height: calc(
        ${remScale(80)} + ${headerItemPadding}
      ); // TODO: iOS temporary fix, when fix is found, add display: flex to .header
    }
    & > .header > .profileCtn {
      min-width: ${remScale(352)};
      height: ${remScale(112)};
      padding: ${remScale(24)};
      margin-right: ${navBarHeight};
    }
  }
`;

const closeBtnSpacing = "0.5rem";
const CloseBtn = styled.button`
  //align-self: flex-end;
  color: ${colors.white};
  padding: ${closeBtnSpacing};
  appearance: none;
  background: none;
  border: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;

  & > .icon {
    height: calc(${navBarHeight} - (${closeBtnSpacing}) * 2);
    width: calc(${navBarHeight} - (${closeBtnSpacing}) * 2);
  }
`;

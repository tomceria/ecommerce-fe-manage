import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { InlineIcon } from "@iconify/react";
import iconSidedrawer from "@iconify/icons-bx/bx-menu";

import { setDrawer } from "../../reducers";
import stylings from "../../../../styles/stylings/stylings.style";
import { colors, alpha } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import { ListItem } from "./NavBarItem";

const NavBar = props => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    dispatch(setDrawer({ value: true }));
  };

  const content = (
    <Bar>
      <ul>
        {props.children}
        {/* Additional items */}
        <ListItem>
          <div className="itemContainer" onClick={handleOpenDrawer}>
            <InlineIcon className="icon" icon={iconSidedrawer} />
          </div>
        </ListItem>
      </ul>
    </Bar>
  );
  return ReactDOM.createPortal(content, document.getElementById("navbar-hook"));
};

export default NavBar;

// Styles
const Bar = styled.div`
  position: fixed;
  width: 100vw;
  height: ${remScale(48)};
  z-index: 30;
  background-color: ${colors.white + alpha(90)};
  backdrop-filter: blur(5px);
  ${stylings.boxShadow.high};

  & ul {
    display: flex;
    flex-direction: row;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import { ClickAwayListener } from "@material-ui/core";

import stylings from "../../../styles/stylings/stylings.style";
import { colors } from "../../../styles/variables/colors.style";
import { remScale } from "../../../styles/variables/size.style";
import CoopLogo from "../../shared/components/Branding/CoopLogo";
import Avatar from "../../shared/components/UI/Avatar";
import ProfileDropdown from "./Profile/ProfileDropdown";

const MainHeader = () => {
  const [isShownProfile, setIsShownProfile] = useState(false);
  const handleProfileIconCtnOnClick = () => {
    setIsShownProfile(prev => !prev);
  };
  const handleProfileDropdownOnClose = () => {
    setIsShownProfile(false);
  };

  const itemHeight = remScale(40);
  return (
    <Header>
      <CoopLogo color={colors.scheme.normal} />
      <ClickAwayListener onClickAway={handleProfileDropdownOnClose}>
        <ProfileIconCtn isShownProfile={isShownProfile}>
          <span onClick={handleProfileIconCtnOnClick} className="icon">
            <Avatar
              height={itemHeight}
              image="/undraw_male_avatar_323b.png"
              alt="User Profile Picture"
            />
          </span>
          {isShownProfile && (
            <ProfileDropdown
              className="profileDropdown"
              show={isShownProfile}
              closed={handleProfileDropdownOnClose}
            />
          )}
        </ProfileIconCtn>
      </ClickAwayListener>
    </Header>
  );
};

export default MainHeader;

// Styles
export const headerHeight = remScale(64);
const Header = styled.header`
  @media (${stylings.mediaQuery.sm}) {
    display: none;
  }

  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  height: ${headerHeight};
  padding: ${remScale(12)} ${remScale(32)};
  position: fixed;
  z-index: 20;
  ${stylings.boxShadow.high};
  width: 100vw;

  & > div > .profileDropdown {
    right: 0.5rem;
    top: 4.5rem;
  }
`;

const ProfileIconCtn = styled.div`
  & {
    margin-left: auto;
    position: relative;
  }

  & > .icon:hover {
    cursor: pointer;
  }
  ${props =>
    props.isShownProfile &&
    `
    & > .icon:after {
      content:'';
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      opacity: 0.5;
      border: 0.125rem solid ${colors.scheme.normal};
      border-radius: 50%;
    }
  `}
`;

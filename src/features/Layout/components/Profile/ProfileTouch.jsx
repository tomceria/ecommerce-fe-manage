import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { InlineIcon } from "@iconify/react";
import iconLogout from "@iconify/icons-bx/bx-exit";

import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import { setDrawer } from "../../reducers";
import { performLogout } from "../../../Auth/actions";
import Avatar from "../../../shared/components/UI/Avatar";

const profileHeight = remScale(64);

const ProfileTouch = () => {
  const dispatch = useDispatch();

  const handleProfileLinkOnClick = () => {
    dispatch(setDrawer(false));
  };

  const handleLogoutClick = () => {
    dispatch(setDrawer(false));
    dispatch(performLogout());
  };

  return (
    <ProfileContainer>
      <Link to="/" onClick={handleProfileLinkOnClick} className="avatar">
        <Avatar
          height={profileHeight}
          image="https://xansan.com/wp-content/uploads/2018/10/user-avatar-default-2609.png"
          alt="User Profile Picture"
        />
      </Link>
      <Link to="/" onClick={handleProfileLinkOnClick} className="name">
        Lưu Minh Hoàng
      </Link>
      <Link to="/" onClick={handleProfileLinkOnClick} className="handle">
        @hoangluuminh
      </Link>
      <LogoutBtn onClick={handleLogoutClick}>
        <InlineIcon icon={iconLogout} className="icon" />
      </LogoutBtn>
    </ProfileContainer>
  );
};

export default ProfileTouch;

// Styles
const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: ${profileHeight} auto ${profileHeight};
  grid-template-rows: auto auto;
  grid-column-gap: 1rem;
  color: ${colors.white};

  & > a {
    text-decoration: none;
    color: ${colors.white};
  }

  & > .avatar {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  & > .name {
    font-weight: 700;
    display: flex;
    align-self: flex-end;
  }

  & > .handle {
    font-size: 0.75rem;
  }
`;

const logoutBtnSpacing = "1.25rem";
const LogoutBtn = styled.button`
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  height: ${profileHeight};
  width: ${profileHeight};
  padding: ${logoutBtnSpacing} 0 ${logoutBtnSpacing} calc(${logoutBtnSpacing}*2);
  appearance: none;
  background: none;
  border: 0;
  color: ${colors.white};

  @media (orientation: landscape) {
    & {
      padding: ${logoutBtnSpacing};
    }
  }

  & > .icon {
    height: calc(${profileHeight} - (${logoutBtnSpacing}) * 2);
    width: calc(${profileHeight} - (${logoutBtnSpacing}) * 2);
  }
`;

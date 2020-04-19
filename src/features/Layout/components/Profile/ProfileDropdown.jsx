import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import speed from "../../../../styles/variables/speed.style";
import Avatar from "../../../shared/components/UI/Avatar";
import Card from "../../../shared/components/UI/Card";
import Fade from "../../../shared/components/Transitions/Fade";
import { performLogout } from "../../../Auth/actions";

const profileHeight = remScale(96);

const ProfileDropdown = ({ show, closed, className }) => {
  const dispatch = useDispatch();

  const handleLinkOnClick = closed;

  const handleLogoutClick = () => {
    dispatch(performLogout());
  };

  return (
    <Fade in={show} timeout={150} mountOnEnter unmountOnExit>
      <ProfileContainer
        width="auto"
        height={remScale(128)}
        background={colors.white}
        padding="md"
        shadow="high"
        className={className}
      >
        <Link to="/" onClick={handleLinkOnClick} className="avatar">
          <Avatar
            height={profileHeight}
            image="https://xansan.com/wp-content/uploads/2018/10/user-avatar-default-2609.png"
            alt="User Profile Picture"
          />
        </Link>
        <Link to="/" onClick={handleLinkOnClick} className="name">
          Lưu Minh Hoàng
        </Link>
        <Link to="/" onClick={handleLinkOnClick} className="handle">
          @hoangluuminh
        </Link>
        <Link to="/" onClick={handleLinkOnClick} className="profileLink">
          View Profile
        </Link>
        <button type="button" className="logout" onClick={handleLogoutClick}>
          Log Out
        </button>
      </ProfileContainer>
    </Fade>
  );
};

export default ProfileDropdown;

// PropTypes
ProfileDropdown.propTypes = {
  show: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  className: PropTypes.string
};
ProfileDropdown.defaultProps = {
  className: ""
};

// Styles
const ProfileContainer = styled(Card)`
  position: fixed;
  display: grid;
  grid-template-columns: ${profileHeight} auto;
  grid-template-rows: auto auto auto auto;
  grid-column-gap: 1rem;

  & > span,
  & > a {
    text-decoration: none;
    color: ${colors.scheme.normal};
  }

  & > .avatar {
    grid-row-start: 1;
    grid-row-end: 5;
  }

  & > .name,
  & > .profileLink,
  & > .logout {
    display: flex;
    align-items: center;
  }

  & > .name {
    font-weight: 500;
    color: ${colors.font} !important;
  }

  & > .handle {
    font-size: 0.75rem;
    color: ${colors.gray.dark} !important;
  }

  & > .logout {
    appearance: none;
    background: none;
    border: 0;
    font: inherit;
  }
  & > .logout:hover {
    cursor: pointer;
  }

  & > .profileLink,
  & > .logout {
    padding: 0.05rem 0.25rem;
    padding-left: 0.75rem;
    margin: 0.4rem 0 0 0;
    color: ${colors.scheme.normal};
    border: 0.125rem solid transparent;
    transition: ${speed.trans} ease-out;
    transition-property: color, background, box-shadow, border;
  }
  & > .profileLink:hover,
  & > .logout:hover {
    color: ${colors.white};
    background: ${colors.scheme.normal};
    box-shadow: 0 0 0.75rem ${colors.scheme.light};
    border-color: ${colors.scheme.light};
  }
`;

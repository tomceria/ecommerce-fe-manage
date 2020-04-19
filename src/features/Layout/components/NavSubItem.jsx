import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import stylings from "../../../styles/stylings/stylings.style";
import { colors } from "../../../styles/variables/colors.style";
import { remScale } from "../../../styles/variables/size.style";
import speed from "../../../styles/variables/speed.style";
import { setDrawer } from "../reducers";

const NavSubItem = ({ label, link, forSideDrawer }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (forSideDrawer) {
      dispatch(setDrawer(false));
    }
  };

  return (
    <ListItem forSideDrawer={forSideDrawer}>
      <NavLink to={link} exact onClick={handleOnClick}>
        <div className="label">{label}</div>
        <div className="indicator" />
      </NavLink>
    </ListItem>
  );
};

export default NavSubItem;

// PropTypes
NavSubItem.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  forSideDrawer: PropTypes.bool
};
NavSubItem.defaultProps = {
  forSideDrawer: false
};

// Styles
const ListItem = styled.li`
  & > a {
    display: flex;
    align-items: center;
    width: 100%;
    height: ${remScale(48)};
    color: ${colors.gray.offwhite};
    ${props => !props.forSideDrawer && `background: ${colors.gray.darker};`}
    position: relative;
    font-weight: 400;
    padding-left: ${remScale(64)};
    text-decoration: none;
    transition: ${speed.trans} ease-out;
    transition-property: color;
  }
  @media (${stylings.mediaQuery.hover}) {
    & > a:hover {
      color: ${colors.scheme.light};
      cursor: pointer;
    }
  }

  & > a.active {
    ${props => !props.forSideDrawer && `color: ${colors.scheme.light};`}
    ${props =>
      props.forSideDrawer &&
      `
      color: ${colors.scheme.normal};
      background: ${colors.white};
    `}
  }

  & > a .label {
    transition: ${speed.trans} ease-out;
    transition-property: transform;
  }
  @media (${stylings.mediaQuery.hover}) {
    & > a:active > .label {
      transform: scale(0.9, 0.9);
    }
  }

  & > a > .indicator {
    position: absolute;
    left: 0;
    width: ${props => (props.forSideDrawer ? "100%" : remScale(3))};
    height: ${remScale(48)};
    border: 0 solid transparent;
    transition: ${speed.trans} ease-out;
    transition-property: border, box-shadow;
  }

  ${props => !props.forSideDrawer && "& > a:hover > .indicator,"}
  & > a.active > .indicator {
    border: ${remScale(2)} solid ${colors.scheme.light};
    box-shadow: 0 0 ${remScale(12)} ${colors.scheme.light};
    z-index: 5;
  }
`;

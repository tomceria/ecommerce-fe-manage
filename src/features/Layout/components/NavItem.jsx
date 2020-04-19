import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { InlineIcon } from "@iconify/react";

import stylings from "../../../styles/stylings/stylings.style";
import { colors } from "../../../styles/variables/colors.style";
import { remScale } from "../../../styles/variables/size.style";
import speed from "../../../styles/variables/speed.style";
import { setDrawer } from "../reducers";

const NavItem = ({ link, exact, icon, label, forSideDrawer, isInNavBar, children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);
  const [isActiveExact, setIsActiveExact] = useState(false);
  useEffect(() => {
    const regActiveRes = new RegExp(`^${link}`).test(location.pathname);
    const regExactRes = new RegExp(`^${link}$`).test(location.pathname);
    setIsActive(link === "/" ? regExactRes : regActiveRes);
    setIsActiveExact(regExactRes);
  }, [location, link]);

  const handleOnClick = () => {
    if (forSideDrawer) {
      dispatch(setDrawer(false));
    }
  };

  return (
    <ListItem isActive={isActive} isActiveExact={isActiveExact} forSideDrawer={forSideDrawer}>
      <NavLink to={link} exact={exact} onClick={handleOnClick}>
        <div className="label">
          <InlineIcon className="icon" icon={icon} />
          {label}
        </div>
        <div className="indicator" />
      </NavLink>
      {!isInNavBar && <ul className="subItemWrapper">{children}</ul>}
    </ListItem>
  );
};

export default NavItem;

// PropTypes
NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  forSideDrawer: PropTypes.bool,
  isInNavBar: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool]))
};
NavItem.defaultProps = {
  exact: false,
  forSideDrawer: false,
  isInNavBar: false,
  children: null
};

// Styles
const itemHeight = remScale(64);
const indicatorShadowSize = remScale(12);
const ListItem = styled.li`
  //font-size: 16px;
  color: ${colors.gray.offwhite};
  text-decoration: none;
  width: 100%;
  //height: auto;
  display: inline-block;
  position: relative;
  overflow-y: hidden;
  font-weight: 500;
  transition: ${speed.trans} ease-out;
  transition-property: background-color, border, color, box-shadow, height;

  & > a {
    display: flex;
    height: ${itemHeight};
    width: 100%;
    padding: ${remScale(4)};
    color: ${colors.gray.light};
    font-weight: 500;
    align-items: center;
    text-decoration: none;
    transition: ${speed.trans} ease-out;
    transition-property: color, background, box-shadow;
  }
  @media (${stylings.mediaQuery.hover}) {
    & > a:hover {
      cursor: pointer;
        color: ${colors.scheme.light};
        background-color: ${colors.gray.darker};
    }
  }

  ${props => !props.forSideDrawer && "& > a:hover,"}
  & > a.active {
    text-decoration: none;
  }

  & > a.active {
    ${props =>
      !props.forSideDrawer &&
      `
      color: ${colors.scheme.normal};
      background: linear-gradient(to right, ${colors.white} 0%,${colors.white} 50%,${colors.gray.light} 100%);
    `}
    ${props =>
      props.forSideDrawer &&
      !props.isActiveExact &&
      `
      color: ${colors.scheme.light};
    `}
    ${props =>
      props.forSideDrawer &&
      props.isActiveExact &&
      `
      color: ${colors.scheme.normal};
      background: ${colors.white};
    `}
  }

  & > a > .label {
    transition: ${speed.trans} ease-out;
    transition-property: transform;
    display: flex;
    align-items: center;
    margin-left: ${remScale(4)};
    ${props => props.forSideDrawer && "font-weight: 700;"}
  }
  @media (${stylings.mediaQuery.hover}) {
    & > a:active > .label {
        transform: scale(0.9, 0.9);
    }
  }

  & > a > .label > .icon {
    width: 3em;
    height: 1.5em;
  }

  & > a > .indicator {
    position: fixed;
    left: 0;
    width: ${props => (props.forSideDrawer ? "100%" : remScale(3))};
    height: ${itemHeight};
    border: 0 solid transparent;
    position: absolute;
    transition: ${speed.trans} ease-out;
    transition-property: border, box-shadow;
    ${props =>
      props.isActiveExact &&
      `
      border: ${remScale(2)} solid ${colors.scheme.light};
      box-shadow: 0 0 ${indicatorShadowSize} ${colors.scheme.light};
    `}
  }
  @media (${stylings.mediaQuery.hover}) {
    & > a:hover > .indicator {
        border: ${remScale(2)} solid ${colors.scheme.light};
        box-shadow: 0 0 ${indicatorShadowSize} ${colors.scheme.light};
    }
  }

  ${props => !props.forSideDrawer && "& > a:hover > .indicator,"}
  & > a.active > .indicator {
    z-index: 6;
  }

  & > .subItemWrapper {
    display: ${props => (props.isActive || props.forSideDrawer ? "block" : "none")};
  }
`;

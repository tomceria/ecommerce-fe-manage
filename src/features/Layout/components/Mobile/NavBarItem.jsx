import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { InlineIcon } from "@iconify/react";
import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import speed from "../../../../styles/variables/speed.style";

const NavBarItem = ({ link, exact, icon }) => {
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);
  const [isActiveExact, setIsActiveExact] = useState(false);
  useEffect(() => {
    const regActiveRes = new RegExp(`^${link}`).test(location.pathname);
    const regExactRes = new RegExp(`^${link}$`).test(location.pathname);
    setIsActive(link === "/" ? regExactRes : regActiveRes);
    setIsActiveExact(regExactRes);
  }, [location, link]);

  return (
    <ListItem isActive={isActive} isActiveExact={isActiveExact}>
      <NavLink
        to={link}
        exact={exact}
        className="itemContainer"
        // activeClassName={styles.active}
        // onClick={this.clicked}
      >
        <InlineIcon className="icon" icon={icon} />
        <div className="indicator" />
      </NavLink>
    </ListItem>
  );
};

export default NavBarItem;

// PropTypes
NavBarItem.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.shape({}).isRequired,
  exact: PropTypes.bool
};
NavBarItem.defaultProps = {
  exact: false
};

// Styles
const indicatorShadowSize = remScale(12);
export const ListItem = styled.li`
  flex-grow: 1;
  color: ${colors.gray.offwhite};
  text-decoration: none;
  width: remScale(24);
  display: inline-block;
  position: relative;
  overflow-y: hidden;
  font-weight: 500;
  transition: ${speed.trans} ease-out;
  transition-property: background-color, border, color, box-shadow, height;

  & > .itemContainer {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
    padding: ${remScale(4)};
    color: ${colors.gray.dark};
    font-weight: 500;
    align-items: center;
    transition: ${speed.trans} ease-out;
    text-decoration: none;
    transition-property: color, background, box-shadow;
  }

  & > .itemContainer.active {
    color: ${colors.scheme.normal};
  }

  & > .itemContainer > .icon {
    width: 1.5em;
    height: 1.5em;
  }

  & > .itemContainer > .indicator {
    position: absolute;
    left: 0;
    top: 0;
    height: ${remScale(1)};
    width: 100%;
    border: 0 solid transparent;
    transition: ${speed.trans} ease-out;
    transition-property: border, box-shadow;
    ${props =>
      props.isActive &&
      `
      border: 1px solid ${colors.scheme.normal};
      box-shadow: 0 0 ${indicatorShadowSize} ${colors.scheme.normal};
    `}
  }
`;

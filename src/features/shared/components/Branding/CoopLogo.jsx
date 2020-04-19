import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";
import { setDrawer } from "../../../Layout/reducers";
import SysLogo from "./SysLogo";
import ClientLogo from "./ClientLogo";

const CoopLogo = ({ forSideDrawer }) => {
  const dispatch = useDispatch();

  const handleLogoOnClick = () => {
    if (forSideDrawer) {
      dispatch(setDrawer(false));
    }
  };

  return (
    <Logo forSideDrawer={forSideDrawer}>
      <Link to="/" onClick={handleLogoOnClick}>
        <SysLogo
          className="sysLogo"
          type={forSideDrawer ? "icon" : "masked"}
          color={colors.scheme.normal}
        />
      </Link>
      <span className="divider">
        <div style={{ background: forSideDrawer ? colors.white : colors.scheme.normal }} />
      </span>
      <Link to="/">
        <ClientLogo
          className="clientLogo"
          type={forSideDrawer ? "text" : "textDull"}
          color={forSideDrawer ? colors.white : colors.scheme.normal}
        />
      </Link>
    </Logo>
  );
};

export default CoopLogo;

// PropTypes
CoopLogo.propTypes = {
  forSideDrawer: PropTypes.bool
};
CoopLogo.defaultProps = {
  forSideDrawer: false
};

// Styles
const navPaneSize = remScale(224);
const logosHeight = remScale(40);
const headerSidePadding = remScale(32);
const Logo = styled.div`
  display: flex;
  width: calc(${navPaneSize} - (${headerSidePadding}) * 2);
  height: ${logosHeight};
  flex-direction: row;
  justify-content: center;

  & > a {
    height: ${remScale(40)};
  }

  & .sysLogo {
    width: ${remScale(40)};
    height: inherit;
  }

  & .clientLogo {
    width: ${remScale(96)};
    height: inherit;
  }

  & > .divider {
    padding: ${remScale(4)} ${remScale(12)};
  }

  & > .divider > div {
    width: 1px;
    height: 100%;
    background: ${colors.scheme.normal};
  }
`;

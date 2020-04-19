import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { isDesktop, isMobile } from "../../../utils/responsive.util";
import stylings from "../../../styles/stylings/stylings.style";
import { colors } from "../../../styles/variables/colors.style";
import { remScale } from "../../../styles/variables/size.style";
import MainHeader from "../components/MainHeader";
import NavPane from "../components/NavPane";
import NavList from "../components/NavList";
import NavBar from "../components/Mobile/NavBar";
import SideDrawer from "../components/Mobile/SideDrawer";

const MainLayout = ({ children }) => {
  return (
    <>
      <MainHeader />
      {isDesktop(useMediaQuery) && (
        <NavPane>
          <NavList />
        </NavPane>
      )}
      {isMobile(useMediaQuery) && (
        <>
          <NavBar>
            <NavList forNavBar />
          </NavBar>
          <SideDrawer>
            <NavList forSideDrawer />
          </SideDrawer>
        </>
      )}
      {/* Content wrapper */}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

// PropTypes
MainLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainLayout;

// Styles
const drawerSize = remScale(224);
const Wrapper = styled.main`
  @media (${stylings.mediaQuery.sm}) {
    padding: 4rem 0.5rem 3rem;
    width: 100vw;
    margin: 0;
  }

  padding: 4rem 1rem 3rem;
  width: auto;
  height: auto;
  min-height: 100vh;
  background-color: ${colors.gray.light};
  margin-right: auto;
  margin-left: ${drawerSize};
`;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../../../styles/variables/colors.style";
import { remScale } from "../../../styles/variables/size.style";

const NavPane = ({ children }) => {
  return (
    <Aside>
      <ul>{children}</ul>
    </Aside>
  );
};

export default NavPane;

// PropTypes
NavPane.propTypes = {
  children: PropTypes.element.isRequired
};

// Styles
const headerSize = remScale(64);
const Aside = styled.aside`
  background-color: ${colors.gray.dark};
  padding-top: 1.5rem;
  height: calc(100vh - ${headerSize});
  width: 14rem;
  margin-top: ${headerSize};
  position: fixed;
  overflow: auto;

  & ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

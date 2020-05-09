import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewAttributeCtn from "../containers/NewAttributeCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewAttribute = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/attributes" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Attribute list</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">New Attribute</h2>
        <NewAttributeCtn />
      </LayoutCard>
    </>
  );
};

export default NewAttribute;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

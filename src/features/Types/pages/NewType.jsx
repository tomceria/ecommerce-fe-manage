import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewTypeCtn from "../containers/NewTypeCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewType = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/types" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Type list</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">New Type</h2>
        <NewTypeCtn />
      </LayoutCard>
    </>
  );
};

export default NewType;

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

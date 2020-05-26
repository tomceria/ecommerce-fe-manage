import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewMakerCtn from "../containers/NewMakerCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewMaker = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/makers" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Maker list</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">New Maker</h2>
        <NewMakerCtn />
      </LayoutCard>
    </>
  );
};

export default NewMaker;

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

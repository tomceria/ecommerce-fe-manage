import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewBrandCtn from "../containers/NewBrandCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewBrand = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/brands" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Brand list</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">New Brand</h2>
        <NewBrandCtn />
      </LayoutCard>
    </>
  );
};

export default NewBrand;

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

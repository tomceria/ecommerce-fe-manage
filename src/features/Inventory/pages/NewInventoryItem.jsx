import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewInventoryItemCtn from "../containers/NewInventoryItemCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewInventoryItem = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/inventory" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Inventory</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Import to Inventory</h2>
        <NewInventoryItemCtn />
      </LayoutCard>
    </>
  );
};

export default NewInventoryItem;

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

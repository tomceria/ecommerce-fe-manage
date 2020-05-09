import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import EditInventoryItemCtn from "../containers/EditInventoryItemCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditInventoryItem = () => {
  const routeMatch = useRouteMatch();
  const inventoryItemId = routeMatch.params.id;

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
        <h2 className="title">Edit InventoryItem</h2>
        <EditInventoryItemCtn subjectId={inventoryItemId} />
      </LayoutCard>
    </>
  );
};

export default EditInventoryItem;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  justify-content: space-between;

  & > div > a {
    text-decoration: none;
  }

  & > div > * > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

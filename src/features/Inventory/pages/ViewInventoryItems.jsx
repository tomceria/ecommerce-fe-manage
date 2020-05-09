import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import model from "../models";
import ViewInventoryItemsCtn from "../containers/ViewInventoryItemsCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewInventoryItems = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/inventory/add">
            <Button color="primary">Start Import</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Inventory</h2>
        <ViewInventoryItemsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            {
              id: "inventoryItemId",
              sortId: "id",
              label: model.find(e => e.name === "id").label,
              width: 200
            },
            { id: "Item.name", sortId: "itemId", label: "Product Name", width: 200 },
            {
              id: "variationId",
              label: model.find(e => e.name === "variationId").label,
              width: 50
            },
            { id: "available", label: model.find(e => e.name === "available").label },
            { id: "bought", label: "Bought?" },
            { id: "createdAt", label: "Imported at", width: 125 }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewInventoryItems;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
    flex-grow: 1;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";
import ViewInventoryItemsCtn from "../containers/ViewInventoryItemsCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewInventoryItems = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/inventory/add">
            <Button color="primary">{t("UI.PAGES.INVENTORY.ADD")}</Button>
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
              label: model(t).find(e => e.name === "id").label,
              width: 200
            },
            {
              id: "Item.name",
              sortId: "itemId",
              label: model(t).find(e => e.name === "itemId").label,
              width: 200
            },
            {
              id: "variationId",
              label: model(t).find(e => e.name === "variationId").label,
              width: 50
            },
            { id: "available", label: model(t).find(e => e.name === "available").label },
            { id: "bought", label: t("INVENTORY.LABEL.BOUGHT") },
            { id: "createdAt", label: t("INVENTORY.LABEL.CREATEDAT"), width: 125 }
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

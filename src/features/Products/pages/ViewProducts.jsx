import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";
import ViewProductsCtn from "../containers/ViewProductsCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewProducts = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/add">
            <Button color="primary">{t("UI.PAGES.PRODUCTS.ADD")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/scales">
            <Button color="secondary">{t("PRODUCTS.LABEL.VIEW_SCALES")}</Button>
          </Link>
          <Link to="/products/types">
            <Button color="secondary">{t("PRODUCTS.LABEL.VIEW_TYPES")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/makers">
            <Button color="secondary">{t("PRODUCTS.LABEL.VIEW_MAKERS")}</Button>
          </Link>
          <Link to="/products/brands">
            <Button color="secondary">{t("PRODUCTS.LABEL.VIEW_BRANDS")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/attributes">
            <Button color="secondary">{t("PRODUCTS.LABEL.VIEW_ATTRIBUTES")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.HOME")}</h2>
        <ViewProductsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "name", label: model(t).find(e => e.name === "name").label, width: 200 },
            { id: "image", label: t("PRODUCTS.LABEL.IMAGE"), noSort: true },
            { id: "price", label: model(t).find(e => e.name === "price").label, width: 135 },
            { id: "quantities", label: t("PRODUCTS.LABEL.QUANTITIES"), width: 128, noSort: true },
            { id: "scale", label: model(t).find(e => e.name === "scale").label },
            { id: "type", label: model(t).find(e => e.name === "type").label },
            { id: "maker", label: model(t).find(e => e.name === "maker").label },
            { id: "brand", label: model(t).find(e => e.name === "brand").label },
            { id: "year", label: model(t).find(e => e.name === "year").label },
            { id: "createdAt", label: t("PRODUCTS.LABEL.CREATEDAT"), width: 125 },
            { id: "hidden", label: t("PRODUCTS.LABEL.HIDDEN"), width: 150 }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewProducts;

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

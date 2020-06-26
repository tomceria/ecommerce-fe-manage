import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewAttributesCtn from "../containers/ViewAttributesCtn";

const ViewAttributes = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products" style={{ flexGrow: 1 }}>
            <Button color="default">{t("PRODUCTS.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/attributes/add" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("UI.PAGES.PRODUCTS.ATTRIBUTES.ADD")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.ATTRIBUTES.HOME")}</h2>
        <ViewAttributesCtn
          tableHead={[
            { id: "id", label: model(t).find(e => e.name === "id").label, noSort: true },
            { id: "name", label: model(t).find(e => e.name === "name").label, noSort: true },
            {
              id: "valueType",
              label: model(t).find(e => e.name === "valueType").label,
              noSort: true
            },
            {
              id: "description",
              label: model(t).find(e => e.name === "description").label,
              noSort: true
            },
            { id: "placing", label: t("ATTRIBUTES.LABEL.PLACING"), width: 192, noSort: true }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewAttributes;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > * > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

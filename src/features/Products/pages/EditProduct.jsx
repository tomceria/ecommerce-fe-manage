import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditProductCtn from "../containers/EditProductCtn";
import DeleteProductCtn from "../containers/DeleteProductCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditProduct = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const productId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("PRODUCTS.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteProductCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.EDIT")}</h2>
        <EditProductCtn subjectId={productId} />
      </LayoutCard>
    </>
  );
};

export default EditProduct;

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

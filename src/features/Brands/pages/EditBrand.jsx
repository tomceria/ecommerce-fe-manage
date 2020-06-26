import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditBrandCtn from "../containers/EditBrandCtn";
import DeleteBrandCtn from "../containers/DeleteBrandCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditBrand = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const brandId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/brands" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("BRANDS.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteBrandCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.BRANDS.EDIT")}</h2>
        <EditBrandCtn subjectId={brandId} />
      </LayoutCard>
    </>
  );
};

export default EditBrand;

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

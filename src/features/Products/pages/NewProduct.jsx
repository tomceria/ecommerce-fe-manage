import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NewProductCtn from "../containers/NewProductCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewProduct = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("PRODUCTS.LABEL.BACK")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.ADD")}</h2>
        <NewProductCtn />
      </LayoutCard>
    </>
  );
};

export default NewProduct;

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

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NewPromotionCtn from "../containers/NewPromotionCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewPromotion = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/promotions" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("PROMOTIONS.LABEL.BACK")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PROMOTIONS.ADD")}</h2>
        <NewPromotionCtn />
      </LayoutCard>
    </>
  );
};

export default NewPromotion;

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

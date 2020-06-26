import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditPromotionCtn from "../containers/EditPromotionCtn";
import DeletePromotionCtn from "../containers/DeletePromotionCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditPromotion = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const promotionId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/promotions" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("PROMOTIONS.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeletePromotionCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PROMOTIONS.EDIT")}</h2>
        <EditPromotionCtn subjectId={promotionId} />
      </LayoutCard>
    </>
  );
};

export default EditPromotion;

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

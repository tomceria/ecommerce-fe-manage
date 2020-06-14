import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import InspectOrderCtn from "../containers/InspectOrderCtn";
import VerifyOrderCtn from "../containers/VerifyOrderCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const VerifyOrder = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const orderId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/orders" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("ORDERS.LABEL.BACK")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.ORDERS.INSPECT")}</h2>
        <InspectOrderCtn subjectId={orderId} />
      </LayoutCard>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.ORDERS.VERIFY")}</h2>
        <VerifyOrderCtn subjectId={orderId} />
      </LayoutCard>
    </>
  );
};

export default VerifyOrder;

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

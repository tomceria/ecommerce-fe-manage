import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditScaleCtn from "../containers/EditScaleCtn";
import DeleteScaleCtn from "../containers/DeleteScaleCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditScale = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const scaleId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/scales" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("SCALES.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteScaleCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.SCALES.EDIT")}</h2>
        <EditScaleCtn subjectId={scaleId} />
      </LayoutCard>
    </>
  );
};

export default EditScale;

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

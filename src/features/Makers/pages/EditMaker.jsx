import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditMakerCtn from "../containers/EditMakerCtn";
import DeleteMakerCtn from "../containers/DeleteMakerCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditMaker = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const makerId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/makers" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("MAKERS.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteMakerCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.MAKERS.EDIT")}</h2>
        <EditMakerCtn subjectId={makerId} />
      </LayoutCard>
    </>
  );
};

export default EditMaker;

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

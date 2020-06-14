import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditAttributeCtn from "../containers/EditAttributeCtn";
import DeleteAttributeCtn from "../containers/DeleteAttributeCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditAttribute = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const attributeId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/attributes" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("ATTRIBUTES.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteAttributeCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.ATTRIBUTES.EDIT")}</h2>
        <EditAttributeCtn subjectId={attributeId} />
      </LayoutCard>
    </>
  );
};

export default EditAttribute;

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

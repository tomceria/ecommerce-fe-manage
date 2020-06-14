import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditTypeCtn from "../containers/EditTypeCtn";
import DeleteTypeCtn from "../containers/DeleteTypeCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditType = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const typeId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/types" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("TYPES.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteTypeCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PRODUCTS.TYPES.EDIT")}</h2>
        <EditTypeCtn subjectId={typeId} />
      </LayoutCard>
    </>
  );
};

export default EditType;

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

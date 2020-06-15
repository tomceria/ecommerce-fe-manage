import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NewInventoryItemBasicCtn from "../containers/NewInventoryItemBasicCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewInventoryItemBasic = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/inventory" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("INVENTORY.LABEL.BACK")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.INVENTORY.ADDBASIC")}</h2>
        <NewInventoryItemBasicCtn />
      </LayoutCard>
    </>
  );
};

export default NewInventoryItemBasic;

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

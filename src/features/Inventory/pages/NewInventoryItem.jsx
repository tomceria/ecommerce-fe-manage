import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NewInventoryItemCtn from "../containers/NewInventoryItemCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewInventoryItem = () => {
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
        <h2 className="title">{t("UI.PAGES.INVENTORY.ADD")}</h2>
        <p>
          {t("INVENTORY.TEXT.ADD.TXT0")}
          <b>{t("INVENTORY.TEXT.ADD.TXT1")}</b>
          {t("INVENTORY.TEXT.ADD.TXT2")}
        </p>
        <ul>
          <li>{t("INVENTORY.TEXT.ADD.TXT3")}</li>
          <li>
            {t("INVENTORY.TEXT.ADD.TXT4")}
            <ul>
              <li>{t("INVENTORY.TEXT.ADD.TXT5")}</li>
              <li>{t("INVENTORY.TEXT.ADD.TXT6")}</li>
              <li>{t("INVENTORY.TEXT.ADD.TXT7")}</li>
            </ul>
          </li>
        </ul>
        <NewInventoryItemCtn />
      </LayoutCard>
    </>
  );
};

export default NewInventoryItem;

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

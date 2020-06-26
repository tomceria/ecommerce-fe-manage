import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewPromotionsCtn from "../containers/ViewPromotionsCtn";

const ViewPromotions = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/promotions/add" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("UI.PAGES.PROMOTIONS.ADD")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.PROMOTIONS.HOME")}</h2>
        <ViewPromotionsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "timeStart",
            sortDesc: true
          }}
          tableHead={[
            { id: "id", label: model(t).find(e => e.name === "id").label },
            { id: "name", label: model(t).find(e => e.name === "name").label },
            { id: "timeStart", label: model(t).find(e => e.name === "timeStart").label },
            { id: "timeEnd", label: model(t).find(e => e.name === "timeEnd").label },
            { id: "offPercent", label: model(t).find(e => e.name === "offPercent").label },
            {
              id: "description",
              label: model(t).find(e => e.name === "description").label,
              noSort: true
            }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewPromotions;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > * > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

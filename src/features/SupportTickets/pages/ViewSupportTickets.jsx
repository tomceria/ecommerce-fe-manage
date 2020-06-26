import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewSupportTicketsCtn from "../containers/ViewSupportTicketsCtn";
import Tooltip from "../../shared/components/Data/Tooltip";

const ViewSupportTickets = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Tooltip title={t("SUPPORT.TEXT.VIEW.TXT0")}>
            <span style={{ flexGrow: 1 }}>
              <Button disabled color="primary">
                {t("SUPPORT.LABEL.ADDSUPPORTTICKET")}
              </Button>
            </span>
          </Tooltip>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.SUPPORT.HOME")}</h2>
        <ViewSupportTicketsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "supportTicketId", label: model(t).find(e => e.name === "id").label, width: 150 },
            {
              id: "supportTypeId",
              label: model(t).find(e => e.name === "supportTypeId").label,
              width: 200
            },
            { id: "statusId", label: model(t).find(e => e.name === "statusId").label, width: 150 },
            { id: "customer", label: model(t).find(e => e.name === "customer").label },
            { id: "support", label: model(t).find(e => e.name === "support").label, width: 150 },
            { id: "orderId", label: model(t).find(e => e.name === "orderId").label, width: 125 },
            { id: "createdAt", label: t("MODELLING.COMMON.CREATEDAT"), width: 125 }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewSupportTickets;

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

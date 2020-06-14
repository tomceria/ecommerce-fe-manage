import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EditSupportTicketCtn from "../containers/EditSupportTicketCtn";
import DeleteSupportTicketCtn from "../containers/DeleteSupportTicketCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditSupportTicket = () => {
  const routeMatch = useRouteMatch();
  const { t } = useTranslation();

  const supportTicketId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/support" style={{ flexGrow: 1 }}>
            <Button color="primary">{t("SUPPORT.LABEL.BACK")}</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteSupportTicketCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">{t("UI.PAGES.SUPPORT.EDIT")}</h2>
        <EditSupportTicketCtn subjectId={supportTicketId} />
      </LayoutCard>
    </>
  );
};

export default EditSupportTicket;

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

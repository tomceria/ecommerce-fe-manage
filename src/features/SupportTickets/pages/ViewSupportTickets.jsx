import React from "react";
import styled from "styled-components";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewSupportTicketsCtn from "../containers/ViewSupportTicketsCtn";
import Tooltip from "../../shared/components/Data/Tooltip";

const ViewSupportTickets = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Tooltip title="Support Tickets must be submitted by customers">
            <span style={{ flexGrow: 1 }}>
              <Button disabled color="primary">
                Add Support Ticket
              </Button>
            </span>
          </Tooltip>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Support Tickets</h2>
        <ViewSupportTicketsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "supportTicketId", label: model.find(e => e.name === "id").label, width: 150 },
            {
              id: "supportTypeId",
              label: model.find(e => e.name === "supportTypeId").label,
              width: 200
            },
            { id: "statusId", label: model.find(e => e.name === "statusId").label, width: 150 },
            { id: "customer", label: model.find(e => e.name === "customer").label },
            { id: "support", label: model.find(e => e.name === "support").label, width: 150 },
            { id: "orderId", label: model.find(e => e.name === "orderId").label, width: 125 },
            { id: "createdAt", label: "Created at", width: 125 }
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

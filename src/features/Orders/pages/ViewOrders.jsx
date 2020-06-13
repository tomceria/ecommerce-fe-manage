import React from "react";
import styled from "styled-components";

import model, { orderFilterModel } from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewOrdersCtn from "../containers/ViewOrdersCtn";
import Tooltip from "../../shared/components/Data/Tooltip";

const ViewOrders = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Tooltip title="Order must be created through storefront's website">
            <span style={{ flexGrow: 1 }}>
              <Button disabled color="primary">
                Add Order
              </Button>
            </span>
          </Tooltip>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Orders</h2>
        <ViewOrdersCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "orderId", label: "Order ID" },
            { id: "userId", label: model.find(e => e.name === "userId").label },
            { id: "payee_phone", label: "Phone", noSort: true },
            { id: "payee_address", label: "Delivery Address", width: 200, noSort: true },
            { id: "verifier", label: orderFilterModel.find(e => e.name === "verifier").label },
            { id: "statusId", label: "Status", width: 150 },
            { id: "totalPrice", label: "Total Payment" },
            // { id: "downPayment", label: "Downpayment", noSort: true },
            // { id: "loanTerm", label: "Loan Term", noSort: true },
            // { id: "apr", label: "APR", noSort: true },
            { id: "createdAt", label: "Created at", width: 125 },
            { id: "modify", label: "Actions", noSort: true, width: 350 }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewOrders;

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

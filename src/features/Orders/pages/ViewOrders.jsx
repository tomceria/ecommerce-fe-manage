import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import model, { orderFilterModel } from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewOrdersCtn from "../containers/ViewOrdersCtn";

const ViewOrders = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/orders/add" style={{ flexGrow: 1 }}>
            <Button color="primary">New POS Order</Button>
          </Link>
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
            { id: "verifier", label: orderFilterModel.find(e => e.name === "verifier").label },
            { id: "statusId", label: "Status" },
            { id: "totalPrice", label: "Total Payment" },
            { id: "downPayment", label: "Downpayment", noSort: true },
            { id: "loanTerm", label: "Loan Term", noSort: true },
            { id: "apr", label: "APR", noSort: true },
            { id: "createdAt", label: "Created at", width: 125 },
            { id: "modify", label: "Actions", noSort: true, width: 210 }
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

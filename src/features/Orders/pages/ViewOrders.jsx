import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import model, { orderFilterModel } from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewOrdersCtn from "../containers/ViewOrdersCtn";
import Tooltip from "../../shared/components/Data/Tooltip";

const ViewOrders = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Tooltip title={t("ORDERS.TEXT.VIEW.TXT0")}>
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
            { id: "orderId", label: model(t).find(e => e.name === "id").label },
            { id: "userId", label: model(t).find(e => e.name === "userId").label },
            {
              id: "payee_phone",
              label: model(t).find(e => e.name === "phone").label,
              noSort: true
            },
            {
              id: "payee_address",
              label: model(t).find(e => e.name === "address").label,
              width: 200,
              noSort: true
            },
            { id: "verifier", label: orderFilterModel(t).find(e => e.name === "verifier").label },
            {
              id: "statusId",
              label: orderFilterModel(t).find(e => e.name === "statusId").label,
              width: 150
            },
            { id: "totalPrice", label: t("ORDERS.LABEL.TOTALPAYMENT") },
            // { id: "downPayment", label: "Downpayment", noSort: true },
            // { id: "loanTerm", label: "Loan Term", noSort: true },
            // { id: "apr", label: "APR", noSort: true },
            { id: "createdAt", label: t("MODELLING.COMMON.CREATEDAT"), width: 125 },
            { id: "modify", label: t("ORDERS.LABEL.MODIFY"), noSort: true, width: 350 }
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

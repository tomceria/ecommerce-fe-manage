import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import InspectOrderCtn from "../containers/InspectOrderCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const InspectOrder = () => {
  const routeMatch = useRouteMatch();
  const orderId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/orders" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Orders</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Inspect Order</h2>
        <InspectOrderCtn subjectId={orderId} />
      </LayoutCard>
    </>
  );
};

export default InspectOrder;

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

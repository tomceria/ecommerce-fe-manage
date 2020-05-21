import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewOrderCtn from "../containers/NewOrderCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewOrder = () => {
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
        <h2 className="title">New POS Order</h2>
        <NewOrderCtn />
      </LayoutCard>
    </>
  );
};

export default NewOrder;

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

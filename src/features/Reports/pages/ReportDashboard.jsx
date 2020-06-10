import React from "react";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

import MonthlySalesReportCtn from "../containers/MonthlySalesReportCtn";
import ProductSalesReportCtn from "../containers/ProductSalesReportCtn";
import CategorySalesReportCtn from "../containers/CategorySalesReportCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ReportDashboard = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/reports#yearly">
            <Button color="secondary">Monthly Sales</Button>
          </Link>
        </div>
        <div>
          <Link to="/reports#product">
            <Button color="secondary">Sales by Product</Button>
          </Link>
        </div>
        <div>
          <Link to="/reports#category">
            <Button color="secondary">Sales by Category</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title" id="yearly">
          Monthly Sales
        </h2>
        <MonthlySalesReportCtn />
      </LayoutCard>
      <LayoutCard>
        <h2 className="title" id="product">
          Sales by Product
        </h2>
        <ProductSalesReportCtn />
      </LayoutCard>
      <LayoutCard>
        <h2 className="title" id="category">
          Sales by Category
        </h2>
        <CategorySalesReportCtn />
      </LayoutCard>
    </>
  );
};

export default ReportDashboard;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
    flex-grow: 1;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;

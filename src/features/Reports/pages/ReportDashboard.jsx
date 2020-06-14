import React from "react";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

import MonthlySalesReportCtn from "../containers/MonthlySalesReportCtn";
import ProductSalesReportCtn from "../containers/ProductSalesReportCtn";
import CategorySalesReportCtn from "../containers/CategorySalesReportCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ReportDashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/reports#monthly">
            <Button color="secondary">{t("REPORTS.LABEL.REPORTMONTHLY")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/reports#product">
            <Button color="secondary">{t("REPORTS.LABEL.REPORTPRODUCT")}</Button>
          </Link>
        </div>
        <div>
          <Link to="/reports#category">
            <Button color="secondary">{t("REPORTS.LABEL.REPORTCATEGORY")}</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title" id="monthly">
          {t("REPORTS.LABEL.REPORTMONTHLY")}
        </h2>
        <MonthlySalesReportCtn />
      </LayoutCard>
      <LayoutCard>
        <h2 className="title" id="product">
          {t("REPORTS.LABEL.REPORTPRODUCT")}
        </h2>
        <ProductSalesReportCtn />
      </LayoutCard>
      <LayoutCard>
        <h2 className="title" id="category">
          {t("REPORTS.LABEL.REPORTCATEGORY")}
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

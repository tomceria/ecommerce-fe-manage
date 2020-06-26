import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import ReportChart from "../components/ReportChart";
import FormWrapper from "../../shared/containers/FormWrapper";
import FormField from "../../shared/containers/FormField";
import request from "../../../utils/request.util";

const CategorySalesReportCtn = () => {
  const { t } = useTranslation();

  const formFuncs = useForm();
  const [isLoading, setIsLoading] = useState(true);

  const [salesReportData, setSalesReportData] = useState(null);
  const [countReportData, setCountReportData] = useState(null);

  useEffect(() => {
    formFuncs.handleSubmit(handleOnSubmit)(); // eslint-disable-line
  }, []); // eslint-disable-line

  const fetchReport = async (category, timeStart, timeEnd) => {
    setIsLoading(true);

    const result = await request(
      "get",
      `/reports/category/${category}?timeStart=${timeStart}&timeEnd=${timeEnd}`
    );
    const { report } = result.data;
    setSalesReportData(report[0]);
    setCountReportData(report[1]);

    setIsLoading(false);
  };

  const handleOnSubmit = async data => {
    const { category } = data;
    const timeStart = data.timeStart.toISOString ? data.timeStart.toISOString() : data.timeStart;
    const timeEnd = data.timeEnd.toISOString ? data.timeEnd.toISOString() : data.timeEnd;
    await fetchReport(category, timeStart, timeEnd);
  };

  return (
    <>
      <FormWrapper formFuncs={formFuncs} submitted={handleOnSubmit}>
        {["category", "timeStart", "timeEnd"].map(fieldName => (
          <FormField
            key={fieldName}
            model={model(t).find(a => a.name === fieldName)}
            formFuncs={formFuncs}
            changed={() => formFuncs.handleSubmit(handleOnSubmit)()}
            disabled={isLoading}
            style={{ flexGrow: 1 }}
          />
        ))}
      </FormWrapper>
      {salesReportData && countReportData && (
        <>
          <h3>{t("REPORTS.LABEL.SALES")}</h3>
          <ReportChart type="pie" data={salesReportData} />
          <h3>{t("REPORTS.LABEL.QUANTITY")}</h3>
          <ReportChart type="pie" data={countReportData} />
        </>
      )}
    </>
  );
};

export default CategorySalesReportCtn;

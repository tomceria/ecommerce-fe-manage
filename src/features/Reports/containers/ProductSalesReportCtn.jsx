import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import model from "../models";
import ReportChart from "../components/ReportChart";
import FormWrapper from "../../shared/containers/FormWrapper";
import FormField from "../../shared/containers/FormField";
import request from "../../../utils/request.util";

const ProductSalesReportCtn = () => {
  const formFuncs = useForm();
  const [isLoading, setIsLoading] = useState(true);

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    formFuncs.handleSubmit(handleOnSubmit)(); // eslint-disable-line
  }, []); // eslint-disable-line

  const fetchReport = async (timeStart, timeEnd) => {
    setIsLoading(true);

    const result = await request(
      "get",
      `/reports/product?timeStart=${timeStart}&timeEnd=${timeEnd}`
    );
    const { report } = result.data;
    setReportData(report);

    setIsLoading(false);
  };

  const handleOnSubmit = async data => {
    const timeStart = data.timeStart.toISOString ? data.timeStart.toISOString() : data.timeStart;
    const timeEnd = data.timeEnd.toISOString ? data.timeEnd.toISOString() : data.timeEnd;
    await fetchReport(timeStart, timeEnd);
  };

  return (
    <>
      <FormWrapper formFuncs={formFuncs} submitted={handleOnSubmit}>
        {["timeStart", "timeEnd"].map(fieldName => (
          <FormField
            key={fieldName}
            model={model.find(a => a.name === fieldName)}
            formFuncs={formFuncs}
            changed={() => formFuncs.handleSubmit(handleOnSubmit)()}
            disabled={isLoading}
            style={{ flexGrow: 1 }}
          />
        ))}
      </FormWrapper>
      {reportData && <ReportChart type="bar-horizontal" data={reportData} />}
    </>
  );
};

export default ProductSalesReportCtn;

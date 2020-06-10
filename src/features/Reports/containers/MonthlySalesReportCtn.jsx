import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import model from "../models";
import ReportChart from "../components/ReportChart";
import FormWrapper from "../../shared/containers/FormWrapper";
import FormField from "../../shared/containers/FormField";
import request from "../../../utils/request.util";

const MonthlySalesReportCtn = () => {
  const formFuncs = useForm();
  const [isLoading, setIsLoading] = useState(true);

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    formFuncs.handleSubmit(handleOnSubmit)(); // eslint-disable-line
  }, []); // eslint-disable-line

  const fetchReport = async year => {
    setIsLoading(true);

    const result = await request("get", `/reports/monthly?year=${year}`);
    const { report } = result.data;
    setReportData(report);

    setIsLoading(false);
  };

  const handleOnSubmit = async data => {
    const { year } = data;
    await fetchReport(new Date(year).getFullYear());
  };

  return (
    <>
      <FormWrapper formFuncs={formFuncs} submitted={handleOnSubmit}>
        {["year"].map(fieldName => (
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
      {reportData && <ReportChart type="line" data={reportData} />}
    </>
  );
};

export default MonthlySalesReportCtn;

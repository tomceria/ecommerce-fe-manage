import React from "react";
import PropTypes from "prop-types";
import { Line, Pie, HorizontalBar } from "react-chartjs-2";

const ReportChart = ({ type, data }) => {
  const getChartComponent = () => {
    switch (type) {
      case "line":
      default:
        return Line;
      case "pie":
        return Pie;
      case "bar-horizontal":
        return HorizontalBar;
    }
  };
  const ChartComponent = getChartComponent();

  return <ChartComponent data={data} />;
};

export default ReportChart;

// PropTypes
ReportChart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({})
};
ReportChart.defaultProps = {
  data: undefined
};

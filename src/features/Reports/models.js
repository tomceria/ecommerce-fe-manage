import moment from "moment";

import { dataTypes, fieldTypes } from "../../utils/model.util";

// Models

export default [
  {
    name: "year",
    label: "Year",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.DATE.YEAR,
    defaultValue: new Date().getFullYear().toString()
  },
  {
    name: "category",
    label: "Category",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    defaultValue: "type",
    selections: [
      { id: "type", name: "Type" },
      { id: "scale", name: "Scale" },
      { id: "maker", name: "Maker" },
      { id: "brand", name: "Brand" }
    ]
  },
  {
    name: "timeStart",
    label: "Start Time",
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME,
    defaultValue: moment()
      .subtract(1, "months")
      .toISOString()
  },
  {
    name: "timeEnd",
    label: "End Time",
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME,
    defaultValue: moment().toISOString()
  }
];

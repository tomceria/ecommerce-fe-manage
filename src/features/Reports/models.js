import moment from "moment";

import { dataTypes, fieldTypes } from "../../utils/model.util";

// Models

export default t => [
  {
    name: "year",
    label: t("REPORTS.MODEL.YEAR.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.DATE.YEAR,
    defaultValue: new Date().getFullYear().toString()
  },
  {
    name: "category",
    label: t("REPORTS.MODEL.CATEGORY.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    defaultValue: "type",
    selections: [
      { id: "type", name: t("REPORTS.MODEL.CATEGORY.SELECTIONS.TYPE") },
      { id: "scale", name: t("REPORTS.MODEL.CATEGORY.SELECTIONS.SCALE") },
      { id: "maker", name: t("REPORTS.MODEL.CATEGORY.SELECTIONS.MAKER") },
      { id: "brand", name: t("REPORTS.MODEL.CATEGORY.SELECTIONS.BRAND") }
    ]
  },
  {
    name: "timeStart",
    label: t("REPORTS.MODEL.TIMESTART.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME,
    defaultValue: moment()
      .subtract(1, "months")
      .toISOString()
  },
  {
    name: "timeEnd",
    label: t("REPORTS.MODEL.TIMEEND.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME,
    defaultValue: moment().toISOString()
  }
];

import { dataTypes, fieldTypes } from "../../utils/model.util";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

// Models

export default [
  {
    name: "id",
    label: "ID",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "name",
    label: "Name",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "timeStart",
    label: "Start Time",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "timeEnd",
    label: "End Time",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "offPercent",
    label: "Sale-Off %",
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.INT,
        options: { min: 1, max: 100 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "description",
    label: "Description",
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXTAREA,
    fieldTypeOptions: {
      rows: 5
    }
  },
  {
    name: "items",
    label: "Applied Items",
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: "At least 1 item is required."
      }
    ],
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    },
    fieldType: fieldTypes.PICKER.MULTIPLE
  }
];

export const promotionFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "timeStart",
    label: "Start Time",
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "timeEnd",
    label: "End Time",
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME
  }
];

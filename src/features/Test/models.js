import moment from "moment";

import { dataTypes, fieldTypes } from "../../utils/model.util";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

// Models

export default [
  {
    name: "name",
    label: "Dumb Dummy Field",
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
    name: "picker1",
    label: "Single Product Picker",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.PICKER.SINGLE,
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    }
  },
  {
    name: "picker2",
    label: "Multiple Products Picker",
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: "At least 1 product is required."
      }
    ],
    fieldType: fieldTypes.PICKER.MULTIPLE,
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    }
  },
  {
    name: "available",
    label: "Availability",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 }
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    defaultValue: "false",
    selections: [
      { id: "true", name: "Yes" },
      { id: "false", name: "No" }
    ]
  },
  {
    name: "date",
    label: "Date",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.DATE.DATE
  },
  {
    name: "datetime",
    label: "Date Time",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.DATE.DATETIME,
    defaultValue: moment()
      .add(1, "months")
      .toISOString()
  },
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
    fieldType: fieldTypes.DATE.YEAR
  },
  {
    name: "sheet",
    label: "Import Sheet",
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: "Spreadsheet with data is required."
      },
      {
        dataType: dataTypes.CUSTOM,
        options: (v, formValues) => {
          const arr = JSON.parse(v);
          for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].length !== 3) {
              return false;
            }
          }
          return true;
        },
        msg: "All rows must have only 3 columns."
      }
    ],
    fieldType: fieldTypes.SHEET.SINGLE
  }
];

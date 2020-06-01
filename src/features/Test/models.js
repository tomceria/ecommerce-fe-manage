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
    fieldType: fieldTypes.DATE.DATETIME
  }
];

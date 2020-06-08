import { dataTypes, fieldTypes } from "../../utils/model.util";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

// Constant Fields
const productField = options => ({
  name: "itemId",
  label: "Product",
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: "Required."
    }
  ],
  defaultValue: "",
  fieldType: fieldTypes.PICKER.SINGLE,
  fieldTypeOptions: {
    small: options && options.isFilter && true,
    listName: LISTNAMES.PRODUCTS
  }
});

// Models

const inventoryModel = [
  {
    name: "id",
    label: "Inventory ID",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  productField(),
  {
    name: "variationId",
    label: "Variation",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    selections: [],
    selectionOptions: {
      noneOption: {
        label: "None"
      }
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
    name: "inventories",
    label: "Inventory Import Spreadsheet",
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
export default inventoryModel;

export const inventoryItemFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  productField({ isFilter: true })
];

import { dataTypes, fieldTypes } from "../../utils/model.util";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

// Constant Fields
const productField = (t, options) => ({
  name: "itemId",
  label: t("INVENTORY.MODEL.ITEMID.LABEL"),
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
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

const inventoryModel = t => [
  {
    name: "id",
    label: t("INVENTORY.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  productField(t),
  {
    name: "variationId",
    label: t("INVENTORY.MODEL.VARIATIONID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    selections: [],
    selectionOptions: {
      noneOption: {
        label: t("MODELLING.COMMON.NONE")
      }
    }
  },
  {
    name: "available",
    label: t("INVENTORY.MODEL.AVAILABLE.LABEL"),
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
    label: t("INVENTORY.MODEL.INVENTORIES.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: t("INVENTORY.MODEL.INVENTORIES.DATATYPES.MSG0")
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
        msg: t("INVENTORY.MODEL.INVENTORIES.DATATYPES.MSG1")
      }
    ],
    fieldType: fieldTypes.SHEET.SINGLE
  }
];
export default inventoryModel;

export const inventoryItemFilterModel = t => [
  {
    name: "query",
    label: t("MODELLING.COMMON.QUERY"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  productField(t, { isFilter: true })
];

import { dataTypes, fieldTypes } from "../../utils/model.util";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

// Models

export default t => [
  {
    name: "id",
    label: t("PROMOTIONS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "name",
    label: t("PROMOTIONS.MODEL.NAME.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "timeStart",
    label: t("PROMOTIONS.MODEL.TIMESTART.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "timeEnd",
    label: t("PROMOTIONS.MODEL.TIMEEND.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "offPercent",
    label: t("PROMOTIONS.MODEL.OFFPERCENT.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.INT,
        options: { min: 1, max: 100 },
        msg: t("PROMOTIONS.MODEL.OFFPERCENT.DATATYPES.MSG")
      }
    ],
    fieldType: fieldTypes.INPUT.NUMBER,
    fieldTypeOptions: { step: "1" }
  },
  {
    name: "description",
    label: t("PROMOTIONS.MODEL.DESCRIPTION.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXTAREA,
    fieldTypeOptions: {
      rows: 5
    }
  },
  {
    name: "items",
    label: t("PROMOTIONS.MODEL.ITEMS.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: t("PROMOTIONS.MODEL.ITEMS.DATATYPES.MSG")
      }
    ],
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    },
    fieldType: fieldTypes.PICKER.MULTIPLE
  }
];

export const promotionFilterModel = t => [
  {
    name: "query",
    label: t("MODELLING.COMMON.QUERY"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "timeStart",
    label: t("PROMOTIONS.MODEL.TIMESTART.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME
  },
  {
    name: "timeEnd",
    label: t("PROMOTIONS.MODEL.TIMEEND.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.DATE.DATETIME
  }
];

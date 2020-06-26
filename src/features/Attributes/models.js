import { dataTypes, fieldTypes } from "../../utils/model.util";

// Models

export default t => [
  {
    name: "id",
    label: t("ATTRIBUTES.MODEL.ID.LABEL"),
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
    label: t("ATTRIBUTES.MODEL.NAME.LABEL"),
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
    name: "valueType",
    label: t("ATTRIBUTES.MODEL.VALUETYPE.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    defaultValue: "static",
    selections: [
      {
        id: "static",
        name: t("ATTRIBUTES.MODEL.VALUETYPE.SELECTIONS.STATIC")
      },
      {
        id: "dynamic",
        name: t("ATTRIBUTES.MODEL.VALUETYPE.SELECTIONS.DYNAMIC")
      }
    ]
  },
  {
    name: "description",
    label: t("ATTRIBUTES.MODEL.DESCRIPTION.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXTAREA,
    fieldTypeOptions: {
      rows: 5
    }
  }
];

// export const typeFilterModel = [
// {
// name: "query",
// label: "Search",
// dataTypes: [{ dataType: dataTypes.STRING }],
// fieldType: fieldTypes.INPUT.TEXT
// }
// ];

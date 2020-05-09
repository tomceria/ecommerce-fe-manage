import { dataTypes, fieldTypes } from "../../utils/model.util";

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
    name: "valueType",
    label: "Value Type",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    defaultValue: "static",
    selections: [
      {
        id: "static",
        name: "Static"
      },
      {
        id: "dynamic",
        name: "Dynamic"
      }
    ]
  },
  {
    name: "description",
    label: "Description",
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

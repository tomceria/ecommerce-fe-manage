import { dataTypes, fieldTypes } from "../../utils/model.util";

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
    name: "images",
    label: "Images",
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: "At least 1 image is required."
      }
    ],
    fieldType: fieldTypes.MEDIA.IMAGES
  }
];

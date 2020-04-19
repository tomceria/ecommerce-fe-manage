import { dataTypes, fieldTypes } from "../../utils/model.util";

const authModel = [
  {
    name: "username",
    label: "Username",
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
    name: "password",
    label: "Password",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.INPUT.PASSWORD
  }
];

export default authModel;

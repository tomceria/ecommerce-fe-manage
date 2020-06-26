import { dataTypes, fieldTypes } from "../../utils/model.util";

const authModel = t => [
  {
    name: "username",
    label: t("AUTH.MODEL.USERNAME.LABEL"),
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
    name: "password",
    label: t("AUTH.MODEL.PASSWORD.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.PASSWORD
  }
];

export default authModel;

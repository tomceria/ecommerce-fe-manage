import { dataTypes, fieldTypes } from "../../utils/model.util";

// Constant Fields
const lockedField = options => {
  const field = {
    name: "locked",
    label: "Access status",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.SELECT.SIMPLE,
    defaultValue: undefined,
    selections: [
      { id: "0", name: "Active" },
      { id: "1", name: "Locked" }
    ],
    selectionOptions: {}
  };
  if (options && options.isFilter) {
    field.fieldType = fieldTypes.SELECT.SIMPLE;
    field.selectionOptions.noneOption = { label: "All" };
  } else {
    field.fieldType = fieldTypes.RADIO.GROUPED;
    field.defaultValue = "0";
  }
  return field;
};

// Models

export default [
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
    name: "email",
    label: "Email",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      },
      {
        dataType: dataTypes.FORMAT.EMAIL,
        options: {},
        msg: "Must follow the format of an email. eg. helloworld@domain.com"
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
  },
  {
    name: "password2",
    label: "Confirm password",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      },
      {
        dataType: dataTypes.CUSTOM,
        options: (v, formValues) => v === formValues().password,
        msg: "Passwords must match."
      }
    ],
    fieldType: fieldTypes.INPUT.PASSWORD
  },
  lockedField()
];

export const accountUserFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  lockedField({ isFilter: true })
];

import { isLength, isInt, isNumeric, isEmail } from "validator";

export const dataTypes = {
  STRING: "STRING",
  NUMBER: {
    INT: "NUMBER_INT",
    REAL: "NUMBER_REAL"
  },
  FORMAT: {
    EMAIL: "FORMAT_EMAIL"
  },
  CUSTOM: "CUSTOM"
};
export const fieldTypes = {
  INPUT: {
    TEXT: "INPUT_TEXT",
    PASSWORD: "INPUT_PASSWORD",
    NUMBER: "INPUT_NUMBER",
    TEXTAREA: "INPUT_TEXTAREA"
  },
  SELECT: {
    SIMPLE: "SELECT_SIMPLE"
  },
  CHECK: {
    // TODO: CHECK for FormField
    SIMPLE: "CHECK_SIMPLE",
    GROUPED: "CHECK_GROUPED"
  },
  RADIO: {
    GROUPED: "RADIO_GROUPED"
  }
};

export const validate = (value, _dataTypes, formValues) => {
  const results = [];
  _dataTypes.forEach(dT => {
    let doValidate = null;
    switch (dT.dataType) {
      case dataTypes.STRING: {
        doValidate = isLength;
        break;
      }
      case dataTypes.NUMBER.INT: {
        doValidate = isInt;
        break;
      }
      case dataTypes.NUMBER.REAL: {
        doValidate = isNumeric;
        break;
      }
      case dataTypes.FORMAT.EMAIL: {
        doValidate = isEmail;
        break;
      }
      default: {
        break;
      }
    }
    if (!doValidate) {
      if (dT.dataType === dataTypes.CUSTOM) {
        // With dataType === CUSTOM, dT.options should be a callback func instead of an obj
        results.push(!!dT.options(value.toString(), formValues) || dT.msg);
      } else {
        results.push(false);
      }
    } else {
      results.push(doValidate(value.toString(), dT.options) || dT.msg); // [true, true, "msg", true]
    }
  });
  return results.length === results.filter(r => r === true) || results.filter(r => r !== true)[0];
};

// displayOptions
/*
 * Available Display options
 * hidden: boolean
 */

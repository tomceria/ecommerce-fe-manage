import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectSupportTicketStatuses } from "../SupportTicketStatuses/reducers";
import { selectSupportTypes } from "../SupportTypes/reducers";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

const supportTicketStatusesSelector = selectSupportTicketStatuses.supportTicketStatuses;
const supportTypesSelector = selectSupportTypes.supportTypes;

// Constant Fields
const customerField = (t, options) => ({
  name: "customer",
  label: t("SUPPORT.MODEL.CUSTOMER.LABEL"),
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
    listName: LISTNAMES.ACCOUNTUSERS
  }
});
const supportField = (t, options) => ({
  name: "support",
  label: t("SUPPORT.MODEL.SUPPORT.LABEL"),
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
    listName: LISTNAMES.ACCOUNTSTAFF_SUPPORT
  }
});
const supportTicketStatusField = (t, options) => ({
  name: "statusId",
  label: t("SUPPORT.MODEL.STATUSID.LABEL"),
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
  fieldType: fieldTypes.SELECT.SIMPLE,
  selections: supportTicketStatusesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? "All" : " "
    }
  }
});
const supportTypeField = (t, options) => ({
  name: "supportTypeId",
  label: t("SUPPORT.MODEL.SUPPORTTYPEID.LABEL"),
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
  fieldType: fieldTypes.SELECT.SIMPLE,
  selections: supportTypesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
  }
});

// Models

export default t => [
  {
    name: "id",
    label: t("SUPPORT.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  supportTypeField(t),
  customerField(t),
  supportField(t),
  supportTicketStatusField(t),
  {
    name: "orderId",
    label: t("SUPPORT.MODEL.ORDERID.LABEL"),
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
    name: "note",
    label: t("SUPPORT.MODEL.NOTE.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXTAREA,
    fieldTypeOptions: {
      rows: 5
    }
  }
];

export const supportTicketFilterModel = t => [
  {
    name: "query",
    label: t("MODELLING.COMMON.QUERY"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  customerField(t, { isFilter: true }),
  supportField(t, { isFilter: true }),
  supportTicketStatusField(t, { isFilter: true }),
  supportTypeField(t, { isFilter: true })
];

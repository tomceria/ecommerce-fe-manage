import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectSupportTicketStatuses } from "../SupportTicketStatuses/reducers";
import { selectSupportTypes } from "../SupportTypes/reducers";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

const supportTicketStatusesSelector = selectSupportTicketStatuses.supportTicketStatuses;
const supportTypesSelector = selectSupportTypes.supportTypes;

// Constant Fields
const customerField = options => ({
  name: "customer",
  label: "Customer",
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: "Required."
    }
  ],
  defaultValue: "",
  fieldType: fieldTypes.PICKER.SINGLE,
  fieldTypeOptions: {
    small: options && options.isFilter && true,
    listName: LISTNAMES.ACCOUNTUSERS
  }
});
const supportField = options => ({
  name: "support",
  label: "Support Staff",
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: "Required."
    }
  ],
  defaultValue: "",
  fieldType: fieldTypes.PICKER.SINGLE,
  fieldTypeOptions: {
    small: options && options.isFilter && true,
    listName: LISTNAMES.ACCOUNTSTAFF_SUPPORT
  }
});
const supportTicketStatusField = options => ({
  name: "statusId",
  label: "Status",
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: "Required."
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
const supportTypeField = options => ({
  name: "supportTypeId",
  label: "Support Type",
  dataTypes: [
    {
      dataType: dataTypes.CUSTOM,
      options: (v, formValues) => {
        if (options && options.isFilter) {
          return true;
        }
        return v.length > 0;
      },
      msg: "Required."
    }
  ],
  fieldType: fieldTypes.SELECT.SIMPLE,
  selections: supportTypesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? "All" : " "
    }
  }
});

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
  supportTypeField(),
  customerField(),
  supportField(),
  supportTicketStatusField(),
  {
    name: "orderId",
    label: "Order ID",
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
    name: "note",
    label: "Note",
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXTAREA,
    fieldTypeOptions: {
      rows: 5
    }
  }
];

export const supportTicketFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  customerField({ isFilter: true }),
  supportField({ isFilter: true }),
  supportTicketStatusField({ isFilter: true }),
  supportTypeField({ isFilter: true })
];

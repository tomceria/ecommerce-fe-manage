import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectOrderStatuses } from "../OrderStatuses/reducers";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

const orderStatusesSelector = selectOrderStatuses.orderStatuses;

// Constant Fields
const accountUserField = options => ({
  name: "userId",
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
const accountStaffField = options => ({
  name: "verifier",
  label: "Order Verifier",
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
    listName: LISTNAMES.ACCOUNTSTAFF_MERCHANDISER
  }
});
const orderStatusField = options => ({
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
  selections: orderStatusesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? "All" : " "
    }
  }
});

// Models

const orderModel = [
  {
    name: "id",
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
  accountUserField(),
  {
    name: "lastName",
    label: "Last Name",
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
    name: "firstName",
    label: "First Name",
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
    name: "phone",
    label: "Phone",
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
    name: "address",
    label: "Address",
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
    name: "itemId",
    label: "Product",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.PICKER.SINGLE,
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    }
  },
  {
    name: "variationId",
    label: "Variation",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    selections: [],
    selectionOptions: {
      noneOption: {
        label: "None"
      }
    }
  },
  {
    name: "orderDetails",
    label: "Order Details",
    dataTypes: [],
    fieldType: fieldTypes.ORDERDETAIL.MULTIPLE
  },
  {
    name: "verify",
    label: "Proceed with action...",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: "Required."
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    // defaultValue: "true",
    selections: [
      { id: "true", name: "Verify this order" },
      { id: "false", name: "Cancel this order" }
    ]
  }
];
export default orderModel;

export const orderFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  orderStatusField({ isFilter: true }),
  accountUserField({ isFilter: true }),
  accountStaffField({ isFilter: true })
];

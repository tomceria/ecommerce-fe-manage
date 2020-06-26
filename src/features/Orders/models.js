import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectOrderStatuses } from "../OrderStatuses/reducers";
import { LISTNAMES } from "../shared/components/Form/ItemPicker";

const orderStatusesSelector = selectOrderStatuses.orderStatuses;

// Constant Fields
const accountUserField = (t, options) => ({
  name: "userId",
  label: t("ORDERS.MODEL.USERID.LABEL"),
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
const accountStaffField = (t, options) => ({
  name: "verifier",
  label: t("ORDERS.MODEL.VERIFIER.LABEL"),
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
    listName: LISTNAMES.ACCOUNTSTAFF_MERCHANDISER
  }
});
const orderStatusField = (t, options) => ({
  name: "statusId",
  label: t("ORDERS.MODEL.STATUSID.LABEL"),
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
  selections: orderStatusesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
  }
});

// Models

const orderModel = t => [
  {
    name: "id",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  accountUserField(t),
  {
    name: "lastName",
    label: t("ORDERS.MODEL.ID.LABEL"),
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
    name: "firstName",
    label: t("ORDERS.MODEL.ID.LABEL"),
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
    name: "email",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      },
      {
        dataType: dataTypes.FORMAT.EMAIL,
        options: {},
        msg: t("ORDERS.MODEL.EMAIL.DATATYPES.MSG")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "phone",
    label: t("ORDERS.MODEL.ID.LABEL"),
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
    name: "address",
    label: t("ORDERS.MODEL.ID.LABEL"),
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
    name: "itemId",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.PICKER.SINGLE,
    fieldTypeOptions: {
      listName: LISTNAMES.PRODUCTS
    }
  },
  {
    name: "variationId",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.SELECT.SIMPLE,
    selections: [],
    selectionOptions: {
      noneOption: {
        label: t("MODELLING.COMMON.NONE")
      }
    }
  },
  {
    name: "orderDetails",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.ORDERDETAIL.MULTIPLE
  },
  {
    name: "verify",
    label: t("ORDERS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    // defaultValue: "true",
    selections: [
      { id: "true", name: t("ORDERS.MODEL.VERIFY.SELECTIONS.TRUE") },
      { id: "false", name: t("ORDERS.MODEL.VERIFY.SELECTIONS.FALSE") }
    ]
  }
];
export default orderModel;

export const orderFilterModel = t => [
  {
    name: "query",
    label: t("MODELLING.COMMON.QUERY"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  orderStatusField(t, { isFilter: true }),
  accountUserField(t, { isFilter: true }),
  accountStaffField(t, { isFilter: true })
];

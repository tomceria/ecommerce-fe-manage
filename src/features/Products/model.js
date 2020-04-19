import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectBrands } from "../Brands/reducers";
import { selectCategories } from "../Categories/reducers";

const brandsSelector = selectBrands.brands;
const categoriesSelector = selectCategories.categories;

// Constant Fields
const brandField = {
  name: "brand",
  label: "Brand",
  dataTypes: [{ dataType: dataTypes.STRING }],
  fieldType: fieldTypes.SELECT.SIMPLE,
  selections: brandsSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: "All"
    },
    selectableParent: {
      suffix: " [All]"
    },
    childrenAlias: "ChildTH"
  }
};
const categoryField = {
  name: "category",
  label: "Category",
  dataTypes: [{ dataType: dataTypes.STRING }],
  fieldType: fieldTypes.SELECT.SIMPLE,
  selections: categoriesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: "All"
    },
    selectableParent: {
      suffix: " [All]"
    }
  }
};

// Models

const productModel = [
  {
    name: "name",
    label: "Product Name",
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
    name: "id",
    label: "Product ID",
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
    name: "masp",
    label: "SKU ID",
    dataTypes: [],
    fieldType: fieldTypes.INPUT.TEXT
  },
  {
    name: "priceOg",
    label: "Price",
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.REAL,
        options: { min: 1 },
        msg: "Must be a number (1 or higher)."
      }
    ],
    fieldType: fieldTypes.INPUT.NUMBER,
    fieldTypeOptions: { step: "any" }
  },
  {
    name: "price",
    label: "Price (Sale)",
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.REAL,
        options: { min: 1 },
        msg: "Must be a number (1 or higher)."
      },
      {
        dataType: dataTypes.CUSTOM,
        options: (v, formValues) => parseFloat(formValues().priceOg, 10) >= parseFloat(v, 10),
        msg: "Price (Sale) must be lower than Price."
      }
    ],
    fieldType: fieldTypes.INPUT.NUMBER,
    fieldTypeOptions: { step: "any" }
  },
  {
    name: "description",
    label: "Description",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXTAREA, // TODO: INPUT BLOG
    fieldTypeOptions: { rows: 10 }
  },
  brandField,
  categoryField,
  {
    name: "remain",
    label: "Availability",
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 }
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    defaultValue: "true",
    selections: [
      { id: "true", name: "Yes" },
      { id: "false", name: "No" }
    ]
  }
];
export default productModel;

export const productFilterModel = [
  {
    name: "query",
    label: "Search",
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  brandField,
  categoryField
];

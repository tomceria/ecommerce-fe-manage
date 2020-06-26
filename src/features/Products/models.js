import { dataTypes, fieldTypes } from "../../utils/model.util";
import { selectFilterValues } from "./reducers";
import { selectScales } from "../Scales/reducers";
import { selectTypes } from "../Types/reducers";
import { selectMakers } from "../Makers/reducers";
import { selectBrands } from "../Brands/reducers";

const scalesSelector = selectScales.scales;
const typesSelector = selectTypes.types;
const makersSelector = selectMakers.makers;
const brandsSelector = selectBrands.brands;
const variationNamesSelector = selectFilterValues.variations;

// Constant Fields
const scaleField = (t, options) => ({
  name: "scale",
  label: t("PRODUCTS.MODEL.SCALE.LABEL"),
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
  selections: scalesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
    // selectableParent: {
    // suffix: " [All]"
    // }
  }
});
const typeField = (t, options) => ({
  name: "type",
  label: t("PRODUCTS.MODEL.TYPE.LABEL"),
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
  selections: typesSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
    // selectableParent: {
    // suffix: " [All]"
    // }
  }
});
const makerField = (t, options) => ({
  name: "maker",
  label: t("PRODUCTS.MODEL.MAKER.LABEL"),
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
  selections: makersSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
    // selectableParent: {
    // suffix: " [All]"
    // },
    // childrenAlias: "ChildTH"
  }
});
const brandField = (t, options) => ({
  name: "brand",
  label: t("PRODUCTS.MODEL.BRAND.LABEL"),
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
  selections: brandsSelector,
  selectionOptions: {
    isReduxSelector: true,
    noneOption: {
      label: options && options.isFilter ? t("MODELLING.COMMON.ALL") : " "
    }
    // selectableParent: {
    // suffix: " [All]"
    // },
    // childrenAlias: "ChildTH"
  }
});

// Models

const productModel = t => [
  {
    name: "name",
    label: t("PRODUCTS.MODEL.NAME.LABEL"),
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
    name: "id",
    label: t("PRODUCTS.MODEL.ID.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 },
        msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
      }
    ],
    fieldType: fieldTypes.INPUT.TEXT
  },
  scaleField(t),
  typeField(t),
  makerField(t),
  brandField(t),
  {
    name: "year",
    label: t("PRODUCTS.MODEL.YEAR.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.INT,
        options: { min: 1970 },
        msg: t("PRODUCTS.MODEL.YEAR.DATATYPES.MSG")
      }
    ],
    fieldType: fieldTypes.INPUT.NUMBER,
    fieldTypeOptions: { step: "any" }
  },
  {
    name: "price",
    label: t("PRODUCTS.MODEL.PRICE.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.NUMBER.INT,
        options: { min: 1 },
        msg: t("PRODUCTS.MODEL.PRICE.DATATYPES.MSG")
      }
    ],
    fieldType: fieldTypes.INPUT.NUMBER,
    fieldTypeOptions: { step: "any" }
  },
  {
    name: "hidden",
    label: t("PRODUCTS.MODEL.HIDDEN.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.STRING,
        options: { min: 1 }
      }
    ],
    fieldType: fieldTypes.RADIO.GROUPED,
    defaultValue: "false",
    selections: [
      { id: "true", name: t("MODELLING.COMMON.YES") },
      { id: "false", name: t("MODELLING.COMMON.NO") }
    ]
  },
  {
    name: "images",
    label: t("PRODUCTS.MODEL.IMAGES.LABEL"),
    dataTypes: [
      {
        dataType: dataTypes.ARRAY,
        options: { min: 1 },
        msg: t("PRODUCTS.MODEL.IMAGES.DATATYPES.MSG")
      }
    ],
    fieldType: fieldTypes.MEDIA.IMAGES
  },
  {
    name: "variations",
    label: t("PRODUCTS.MODEL.VARIATIONS.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.VARIATION.MULTIPLE
  },
  {
    name: "attributes",
    label: t("PRODUCTS.MODEL.ATTRIBUTES.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.ATTRIBUTE.MULTIPLE
  },
  {
    name: "blog",
    label: t("PRODUCTS.MODEL.BLOG.LABEL"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXTAREA, // TODO: INPUT BLOG
    fieldTypeOptions: { rows: 10 }
  }
];
export default productModel;

export const productFilterModel = t => [
  {
    name: "query",
    label: t("MODELLING.COMMON.QUERY"),
    dataTypes: [{ dataType: dataTypes.STRING }],
    fieldType: fieldTypes.INPUT.TEXT
  },
  scaleField(t, { isFilter: true }),
  typeField(t, { isFilter: true }),
  makerField(t, { isFilter: true }),
  brandField(t, { isFilter: true }),
  {
    name: "variationName",
    label: t("PRODUCTS.MODEL.VARIATIONNAME.LABEL"),
    dataTypes: [],
    fieldType: fieldTypes.SELECT.SIMPLE,
    selections: variationNamesSelector,
    selectionOptions: {
      isReduxSelector: true,
      noneOption: {
        label: t("MODELLING.COMMON.ALL")
      }
      // selectableParent: {
      // suffix: " [All]"
      // }
    }
  }
];

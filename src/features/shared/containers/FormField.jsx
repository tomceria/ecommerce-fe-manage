import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

import { fieldTypes, validate } from "../../../utils/model.util";

import Input from "../components/Form/Input";
import Autocomplete from "../components/Form/Autocomplete";
import Select from "../components/Form/Select";
import RadioGroup from "../components/Form/RadioGroup";
import DatePicker from "../components/Form/DatePicker";

import ItemPicker from "../components/Form/ItemPicker";
import ImageDropzone from "../components/Form/ImageDropzone";
import SheetDropzone from "../components/Form/SheetDropzone";
import VariationField from "../components/Form/VariationField"; // eslint-disable-line
import AttributeField from "../components/Form/AttributeField"; // eslint-disable-line
import OrderDetailField from "../components/Form/OrderDetailField"; // eslint-disable-line

const FormField = ({ model, changed, disabled, className, style }) => {
  const [isTouched, setIsTouched] = useState(false);

  const formFuncs = useFormContext();

  // Effect for isTouched
  useEffect(() => {
    setIsTouched(
      formFuncs.getValues()[model.name] !== "" || !!formFuncs.formState.dirtyFields[model.name]
    );
    // eslint-disable-next-line
  }, [formFuncs.getValues(), formFuncs.formState.dirtyFields]);

  // Set Field's component and its properties
  const properties = {};
  let FieldComponent = null;
  switch (model.fieldType) {
    case fieldTypes.INPUT.TEXT:
    default: {
      properties.type = "text";
      FieldComponent = Input;
      break;
    }
    case fieldTypes.INPUT.PASSWORD: {
      properties.type = "password";
      FieldComponent = Input;
      break;
    }
    case fieldTypes.INPUT.TEXTAREA: {
      properties.type = "text";
      properties.multiline = true;
      if (model.fieldTypeOptions) {
        properties.rows = model.fieldTypeOptions.rows;
      }
      FieldComponent = Input;
      break;
    }
    case fieldTypes.INPUT.NUMBER: {
      properties.type = "number";
      if (model.fieldTypeOptions) {
        properties.step = model.fieldTypeOptions.step;
      }
      FieldComponent = Input;
      break;
    }
    case fieldTypes.INPUT.AUTOCOMPLETE: {
      properties.type = "text";
      FieldComponent = Autocomplete;
      break;
    }
    case fieldTypes.SELECT.SIMPLE: {
      FieldComponent = Select;
      break;
    }
    case fieldTypes.RADIO.GROUPED: {
      FieldComponent = RadioGroup;
      break;
    }
    case fieldTypes.DATE.DATE: {
      FieldComponent = DatePicker;
      break;
    }
    case fieldTypes.DATE.DATETIME: {
      properties.type = "datetime";
      FieldComponent = DatePicker;
      break;
    }
    // CUSTOM FIELDS
    case fieldTypes.PICKER.SINGLE: {
      if (model.fieldTypeOptions) {
        properties.small = model.fieldTypeOptions.small;
        properties.listName = model.fieldTypeOptions.listName;
      }
      FieldComponent = ItemPicker;
      break;
    }
    case fieldTypes.PICKER.MULTIPLE: {
      properties.multiple = true;
      if (model.fieldTypeOptions) {
        properties.small = model.fieldTypeOptions.small;
        properties.listName = model.fieldTypeOptions.listName;
      }
      FieldComponent = ItemPicker;
      break;
    }
    case fieldTypes.MEDIA.IMAGES: {
      FieldComponent = ImageDropzone;
      break;
    }
    case fieldTypes.VARIATION.MULTIPLE: {
      FieldComponent = VariationField;
      break;
    }
    case fieldTypes.ATTRIBUTE.MULTIPLE: {
      FieldComponent = AttributeField;
      break;
    }
    case fieldTypes.ORDERDETAIL.MULTIPLE: {
      FieldComponent = OrderDetailField;
      break;
    }
    case fieldTypes.SHEET.SINGLE: {
      FieldComponent = SheetDropzone;
      break;
    }
  }

  // Selections configuration
  const {
    isReduxSelector,
    noneOption,
    selectableParent,
    childrenAlias
  } = model.selectionOptions || {
    isReduxSelector: false,
    noneOption: null,
    selectableParent: null,
    childrenAlias: null
  };
  let selections = null;
  const reduxedSelections = useSelector(
    isReduxSelector
      ? model.selections
      : createSelector(
          state => state.empty,
          empty => empty
        )
  );
  if (isReduxSelector) {
    selections = [...reduxedSelections];
  } else {
    selections = model.selections ? [...model.selections] : null;
  }
  if (selections && noneOption) {
    selections.unshift({ id: "", name: noneOption.label || "None" });
  }

  return (
    <FieldComponent
      // Form Identifier
      name={model.name}
      label={model.label}
      // react-hook-form Props
      control={formFuncs.control}
      defaultValue={model.defaultValue || ""}
      rules={{
        validate: value => validate(value, model.dataTypes, formFuncs.getValues)
      }}
      error={!!_.get(formFuncs.errors, model.name)}
      // Selections
      selections={selections}
      selectableParent={selectableParent}
      childrenAlias={childrenAlias}
      // Handlers
      touched={isTouched}
      changed={changed}
      // Others
      errormessage={
        _.get(formFuncs.errors, model.name) && _.get(formFuncs.errors, model.name).message
      }
      disabled={disabled}
      className={className}
      style={style}
      // Additional Properties
      {...properties} // eslint-disable-line
    />
  );
};

export default FormField;

// PropTypes
FormField.propTypes = {
  model: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    dataTypes: PropTypes.arrayOf(
      PropTypes.shape({
        dataType: PropTypes.string.isRequired,
        options: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
        msg: PropTypes.string
      })
    ),
    fieldType: PropTypes.string.isRequired,
    fieldTypeOptions: PropTypes.shape({
      // Input
      rows: PropTypes.number,
      step: PropTypes.string,
      // ItemPicker
      small: PropTypes.bool,
      listName: PropTypes.string
    }),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
    selections: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.func,
      PropTypes.bool
    ]),
    selectionOptions: PropTypes.shape({
      isReduxSelector: PropTypes.bool,
      noneOption: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
          label: PropTypes.string
        })
      ]),
      selectableParent: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
          prefix: PropTypes.string,
          suffix: PropTypes.string
        })
      ]),
      childrenAlias: PropTypes.string
    })
  }).isRequired,
  changed: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  // Additional
  className: PropTypes.string,
  style: PropTypes.shape({})
};
FormField.defaultProps = {
  changed: undefined,
  className: "",
  style: undefined
};

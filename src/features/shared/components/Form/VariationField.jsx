import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";
import { isHexColor } from "validator";
import { useTranslation } from "react-i18next";

import FormField from "../../containers/FormField"; // eslint-disable-line
import Button from "./Button";
import ColorBand from "../Data/ColorBand";
import { dataTypes, fieldTypes } from "../../../../utils/model.util";
import { remScale } from "../../../../styles/variables/size.style";
import { colors } from "../../../../styles/variables/colors.style";
import stylings from "../../../../styles/stylings/stylings.style";

const VariationField = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  // rules,
  // Others
  defaultValue, // NOT react-hook-form defaultValue
  errormessage,
  disabled,
  style,
  className
}) => {
  const { t } = useTranslation();

  const model = (field, index) => [
    {
      name: `${name}[${index}].name`,
      label: t("MODELLING.COMMON.NAME"),
      dataTypes: [
        {
          dataType: dataTypes.STRING,
          options: { min: 1 },
          msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
        }
      ],
      fieldType: fieldTypes.INPUT.TEXT,
      defaultValue:
        index < (Array.isArray(defaultValue.object) && defaultValue.object.length)
          ? defaultValue.object[index].name
          : field.name
    },
    {
      name: `${name}[${index}].colors`,
      label: t("UI.FORM.COLORS"),
      dataTypes: [
        {
          dataType: dataTypes.STRING,
          options: { min: 1 },
          msg: t("MODELLING.DATATYPES.MSG.REQUIRED")
        },
        {
          dataType: dataTypes.CUSTOM,
          options: (v, formValues) => !v.split(",").filter(c => !isHexColor(c)).length > 0,
          msg: "(eg. FEFEFE,ADAFFF)."
        }
      ],
      fieldType: fieldTypes.INPUT.TEXT,
      defaultValue:
        index < (Array.isArray(defaultValue.object) && defaultValue.object.length)
          ? defaultValue.object[index].colors
          : field.colors
    }
  ];

  const formFuncs = useFormContext();

  const { fields: variationFields, append, remove } = useFieldArray({
    control,
    name,
    keyName: "keyId"
  });

  const [colorValues, setColorValues] = useState({});

  // append variations if defaultValue.object is provided
  useEffect(() => {
    if (Array.isArray(defaultValue.object) && defaultValue.object.length > 0) {
      formFuncs.reset({
        [name]: defaultValue.object.map(() => ({ name: "", colors: "" }))
      });
      const newColorValues = {};
      defaultValue.object.forEach((varia, index) => {
        newColorValues[index] = varia.colors;
      });
      setColorValues(newColorValues);
    }
  }, [defaultValue.object]); // eslint-disable-line

  const handleOnColorChange = index => {
    setColorValues(prevState => ({
      ...prevState,
      [index]: formFuncs.getValues()[`${name}[${index}].colors`]
    }));
  };

  return (
    <FieldContainer className={className}>
      <p>{label}</p>
      <VariationFieldStyled style={style} className={error && "error"}>
        {variationFields.map((item, index) => (
          <li key={item.keyId}>
            {index !== 0 && <hr style={{ margin: "1rem 0" }} />}
            <div className="container">
              {model(item, index).map(field => {
                const handlerProps = {};
                if (field.name === `${name}[${index}].colors`) {
                  handlerProps.changed = () => handleOnColorChange(index);
                }
                return (
                  <FormField
                    model={field}
                    key={field.name}
                    formFuncs={formFuncs}
                    disabled={disabled}
                    className="field"
                    //
                    {...handlerProps} // eslint-disable-line
                  />
                );
              })}
              <Button
                onClick={() => remove(index)}
                disabled={
                  (Array.isArray(defaultValue.object) && index < defaultValue.object.length) ||
                  disabled
                }
                className="delete"
              >
                <Icon icon={iconTrash} className="icon" />
              </Button>
            </div>
            <div className="preview">
              <span>{`${t("UI.FORM.PREVIEW")}:`}</span>
              <ColorBand colorsString={colorValues[index]} />
            </div>
          </li>
        ))}
        <hr style={{ margin: "1rem 0" }} />
        <Button onClick={() => append({ name: "", colors: "" })} disabled={disabled}>
          Add
        </Button>
      </VariationFieldStyled>
      <p className="errorMsg">{error && errormessage}</p>
    </FieldContainer>
  );
};

export default VariationField;

// PropTypes
VariationField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // react-hook-form Props
  error: PropTypes.bool,
  control: PropTypes.shape({
    setValue: PropTypes.func,
    triggerValidation: PropTypes.func,
    reRender: PropTypes.func,
    formState: PropTypes.shape({
      isSubmitted: PropTypes.bool
    })
  }).isRequired,
  // rules: PropTypes.shape({}),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      object: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          colors: PropTypes.string
        })
      )
    })
  ]),
  // Others
  errormessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
VariationField.defaultProps = {
  // rules: undefined,
  defaultValue: undefined,
  disabled: false,
  style: {},
  error: undefined,
  errormessage: "",
  className: ""
};

// Styles
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .label {
    margin-bottom: 1rem;
  }

  & > .errorMsg {
    color: ${colors.scheme.error.normal};
    margin: ${remScale(4)} ${remScale(14)} 0;
    font-size: 0.75rem;
  }
`;

const VariationFieldStyled = styled.ul`
  list-style: none;
  padding: 0;
  padding: 1rem;
  margin: 0;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  background: ${colors.white};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }

  & .container {
    display: flex;
  }
  @media (${stylings.mediaQuery.sm}) {
    & .container {
      flex-direction: column;
    }
  }

  & .container > *,
  & .preview > * {
    margin-left: 1rem;
  }
  @media (${stylings.mediaQuery.sm}) {
    & .container > * {
      margin-top: 1rem;
      margin-left: 0;
    }
  }

  & .container > *:first-child,
  & .preview > *:first-child {
    margin-top: 0 !important;
    margin-left: 0 !important;
  }

  & .container > .field {
    flex-grow: 1;
  }

  & .container > .delete .icon {
    margin: 0;
  }

  & .preview {
    display: flex;
    margin-top: 1rem;
  }
`;

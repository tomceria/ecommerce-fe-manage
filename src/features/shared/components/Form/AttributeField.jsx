import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { isInt } from "validator";

import FormField from "../../containers/FormField"; // eslint-disable-line
import { selectAttributes } from "../../../Attributes/reducers";
import { performGetAttributes } from "../../../Attributes/actions";
import { dataTypes, fieldTypes } from "../../../../utils/model.util";
import { remScale } from "../../../../styles/variables/size.style";
import { colors } from "../../../../styles/variables/colors.style";

const AttributeField = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  // rules,
  defaultValue,
  // Others
  errormessage,
  disabled,
  style,
  className
}) => {
  const dispatch = useDispatch();
  const fetchedAttributes = useSelector(selectAttributes.attributes);
  const isLoadingAttributes = useSelector(selectAttributes.isLoadingAttributes);
  const isSuccessAttributes = useSelector(selectAttributes.isSuccessAttributes);

  const model = attribute => [
    {
      name: `${name}.${attribute.id}.value`,
      label: "Value",
      dataTypes: [
        {
          dataType: dataTypes.CUSTOM,
          options: (v, formValues) => {
            if (formValues()[`${name}.${attribute.id}.rating`]) {
              return v.length > 0;
            }
            return true;
          },
          msg: "Required."
        }
      ],
      // TODO: TEMPORARY FIX, wait for Autocomplete solution
      fieldType:
        (defaultValue.object &&
          defaultValue.object.find(a => a.attributeId === attribute.id) &&
          defaultValue.object.find(a => a.attributeId === attribute.id).isPerformingUpdate) ||
        attribute.valueType === "dynamic"
          ? fieldTypes.INPUT.TEXT
          : fieldTypes.INPUT.AUTOCOMPLETE,
      // fieldType:
      // attribute.valueType === "static" ? fieldTypes.INPUT.AUTOCOMPLETE : fieldTypes.INPUT.TEXT,
      selections:
        attribute.valueType === "static" &&
        fetchedAttributes.find(fA => fA.id === attribute.id).usedValues,
      defaultValue:
        Array.isArray(defaultValue.object) &&
        defaultValue.object.find(a => a.attributeId === attribute.id)
          ? defaultValue.object.find(a => a.attributeId === attribute.id).value
          : undefined
    },
    {
      name: `${name}.${attribute.id}.rating`,
      label: "Rating",
      dataTypes: [
        {
          dataType: dataTypes.CUSTOM,
          options: (v, formValues) => {
            if (formValues()[`${name}.${attribute.id}.value`]) {
              return v.length > 0;
            }
            return true;
          },
          msg: "Required."
        },
        {
          dataType: dataTypes.CUSTOM,
          options: (v, formValues) => {
            if (!v) {
              return true;
            }
            return isInt(v) && parseInt(v, 10) >= 1 && parseInt(v, 10) <= 5;
          },
          msg: "Must be between 1 and 5"
        }
      ],
      fieldType: fieldTypes.INPUT.TEXT,
      defaultValue:
        Array.isArray(defaultValue.object) &&
        defaultValue.object.find(a => a.attributeId === attribute.id)
          ? defaultValue.object.find(a => a.attributeId === attribute.id).rating
          : undefined
    }
  ];

  const formFuncs = useFormContext();

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    dispatch(performGetAttributes());
  }, []); // eslint-disable-line

  useEffect(() => {
    setAttributes(fetchedAttributes);
  }, [fetchedAttributes]); // eslint-disable-line

  return (
    <FieldContainer className={className}>
      <p>{label}</p>
      <AttributeFieldStyled style={style} className={error && "error"}>
        <tbody>
          {!isLoadingAttributes &&
            isSuccessAttributes &&
            attributes.map((attribute, index) => (
              <tr key={attribute.id} className="container">
                <td>
                  <span>{attribute.name}</span>
                </td>
                {model(attribute, index).map(field => {
                  return (
                    <td key={field.name}>
                      <FormField
                        model={field}
                        // key={field.name}
                        formFuncs={formFuncs}
                        disabled={disabled}
                        className="field"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </AttributeFieldStyled>
      <p className="errorMsg">{error && errormessage}</p>
    </FieldContainer>
  );
};

export default AttributeField;

// PropTypes
AttributeField.propTypes = {
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
          attributeId: PropTypes.string,
          value: PropTypes.string,
          rating: PropTypes.string
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
AttributeField.defaultProps = {
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

const AttributeFieldStyled = styled.table`
  list-style: none;
  margin: 0;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  background: ${colors.white};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  border-spacing: 1rem;
  border-colllapse: separate;

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }

  & .container > td {
    vertical-align: top;
  }
  & .container > td:first-child {
    vertical-align: middle;
  }

  & .container > td > * {
    width: 100%;
  }
`;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

import FormField from "../../containers/FormField"; // eslint-disable-line
import { LISTNAMES } from "./ItemPicker";
import { dataTypes, fieldTypes } from "../../../../utils/model.util";
import { remScale } from "../../../../styles/variables/size.style";
import { colors } from "../../../../styles/variables/colors.style";

const OrderDetailField = ({
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
  const model = (orderDetail, index) => [
    {
      name: `${name}[${index}].id`,
      label: "Order Detail ID",
      dataTypes: [
        {
          dataType: dataTypes.STRING,
          options: { min: 1 },
          msg: "Required."
        }
      ],
      fieldType: fieldTypes.INPUT.TEXT,
      defaultValue: orderDetail.id.toString()
    },
    {
      name: `${name}[${index}].inventoryId`,
      label: "Inventory Item",
      dataTypes: [
        {
          dataType: dataTypes.STRING,
          options: { min: 1 },
          msg: "Required."
        }
      ],
      fieldType: fieldTypes.PICKER.SINGLE,
      fieldTypeOptions: {
        small: true,
        listName: LISTNAMES.INVENTORY
      },
      defaultValue: ""
    }
  ];

  const formFuncs = useFormContext();

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (!defaultValue.object) {
      return;
    }
    // defaultOrderDetails: sent from Ctn
    const defaultOrderDetails = defaultValue.object.orderDetails;
    if (Array.isArray(defaultOrderDetails) && defaultOrderDetails.length > 0) {
      setOrderDetails(defaultOrderDetails);
    }
  }, [defaultValue.object]); // eslint-disable-line

  return (
    <FieldContainer className={className}>
      <p>{label}</p>
      <OrderDetailFieldStyled style={style} className={error && "error"}>
        <table>
          <tbody>
            {orderDetails.map((orderDetail, index) => (
              <tr key={orderDetail.id} className="container">
                <td>
                  <span>{orderDetail.item_name}</span>
                </td>
                <td>
                  <span>
                    {`Variation ID: `}
                    <b>{orderDetail.item_variationId}</b>
                  </span>
                </td>
                {model(orderDetail, index).map(field => {
                  const additionalProps = {};
                  if (field.name === `${name}[${index}].id`) {
                    additionalProps.style = { display: "none" };
                    additionalProps.disabled = true;
                  }
                  return (
                    // eslint-disable-next-line
                    <td key={field.name} {...additionalProps}>
                      <FormField
                        model={field}
                        // key={field.name}
                        formFuncs={formFuncs}
                        disabled={disabled}
                        className="field"
                        //
                        {...additionalProps} // eslint-disable-line
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </OrderDetailFieldStyled>
      <p className="errorMsg">{error && errormessage}</p>
    </FieldContainer>
  );
};

export default OrderDetailField;

// PropTypes
OrderDetailField.propTypes = {
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
      value: PropTypes.string,
      object: PropTypes.shape({
        orderId: PropTypes.string,
        orderDetails: PropTypes.arrayOf(PropTypes.shape({}))
      })
    })
  ]),
  // Others
  errormessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
OrderDetailField.defaultProps = {
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

const OrderDetailFieldStyled = styled.div`
  display: flex;
  overflow-x: auto;
  list-style: none;
  margin: 0;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  background: ${colors.white};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  & > table {
    border-spacing: 1rem;
    border-colllapse: separate;
  }

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }

  & .container > td {
    vertical-align: middle;
  }

  & .container > td > * {
    width: 100%;
  }
`;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { performGetOrder } from "../actions";
import { selectOrder } from "../reducers";

import OrderDetailList from "../components/OrderDetailList";
import OrderPaymentList from "../components/OrderPaymentList";

import DateDisplay from "../../shared/components/Data/DateDisplay";
import NumberDisplay from "../../shared/components/Data/NumberDisplay";
import OrderStatusDisplay from "../../shared/components/Data/OrderStatusDisplay";

const InspectOrderCtn = ({ subjectId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchedOrder = useSelector(selectOrder.order);
  const isSuccessOrder = useSelector(selectOrder.isSuccessOrder);
  const isLoadingOrder = useSelector(selectOrder.isLoadingOrder);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(performGetOrder(subjectId));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isLoadingOrder && isSuccessOrder) {
      setOrder(fetchedOrder);
    }
  }, [fetchedOrder, isLoadingOrder]); // eslint-disable-line

  return (
    <>
      {!isLoadingOrder && isSuccessOrder && order && (
        <>
          <h3>{t("ORDERS.LABEL.INFORMATION")}</h3>
          <table>
            <tbody>
              <tr>
                <td>{`${t("ORDERS.MODEL.ID.LABEL")}: `}</td>
                <td>{order.id}</td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.CUSTOMERID")}: `}</td>
                <td>{order.userId}</td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.MODEL.STATUSID.LABEL")}: `}</td>
                <td>
                  <OrderStatusDisplay status={order.Status} />
                </td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.TOTALPAYMENT")}: `}</td>
                <td>
                  <NumberDisplay type="currency" value={order.totalPrice} />
                </td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.APPLIEDPROMOTION")}: `}</td>
                <td>{order.appliedPromotion}</td>
              </tr>
              <tr>
                <td>{`${t("MODELLING.COMMON.CREATEDAT")}: `}</td>
                <td>
                  <DateDisplay value={order.createdAt} />
                </td>
              </tr>
              <tr>
                <td>{`${t("MODELLING.COMMON.UPDATEDAT")}: `}</td>
                <td>
                  <DateDisplay value={order.updatedAt} />
                </td>
              </tr>
            </tbody>
          </table>
          <h3>{t("ORDERS.LABEL.PAYEE")}</h3>
          <table>
            <tbody>
              <tr>
                <td>{`${t("ORDERS.LABEL.PAYEE_NAME")}: `}</td>
                <td>{`${order.payee_lastName} ${order.payee_firstName}`}</td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.PAYEE_EMAIL")}: `}</td>
                <td>{order.payee_email}</td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.PAYEE_PHONE")}: `}</td>
                <td>{order.payee_phone}</td>
              </tr>
              <tr>
                <td>{`${t("ORDERS.LABEL.PAYEE_ADDRESS")}: `}</td>
                <td>{order.payee_address}</td>
              </tr>
            </tbody>
          </table>
          {order.downPayment && order.loanTerm && order.apr && (
            <>
              <h3>Loan Info</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Downpayment: </td>
                    <td>
                      <NumberDisplay type="currency" value={order.downPayment} />
                    </td>
                  </tr>
                  <tr>
                    <td>Loan Term: </td>
                    <td>{`${order.loanTerm} months`}</td>
                  </tr>
                  <tr>
                    <td>APR: </td>
                    <td>{`${order.apr}%`}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          <h3>{t("ORDERS.LABEL.DETAILS")}</h3>
          <OrderDetailList
            loading={isLoadingOrder}
            success={isSuccessOrder}
            tableHead={[
              { id: "item_id", label: t("ORDERS.LABEL.ITEM_ID"), noSort: true },
              { id: "item_variationId", label: t("ORDERS.LABEL.ITEM_VARIATIONID"), noSort: true },
              { id: "item_name", label: t("ORDERS.LABEL.ITEM_NAME"), noSort: true },
              { id: "item_price", label: t("ORDERS.LABEL.ITEM_PRICE"), noSort: true },
              { id: "item_inventoryId", label: t("ORDERS.LABEL.ITEM_INVENTORYID"), noSort: true }
            ]}
            items={order.Items}
            filters={{}}
            pagination={null}
            changedPage={() => {}}
            changedRowsPerPage={() => {}}
            changedSort={() => {}}
            // rowActions={() => {}}
            // rowActionsDisabled={() => {}}
            passingRef={null}
          />
          <hr style={{ margin: "2rem 0" }} />
          <h3>{t("ORDERS.LABEL.PAYMENTTRACKING")}</h3>
          <OrderPaymentList
            loading={isLoadingOrder}
            success={isSuccessOrder}
            tableHead={[
              { id: "id", label: t("ORDERS.LABEL.ORDERPAYMENTID"), noSort: true },
              { id: "paymentMethod", label: t("ORDERS.LABEL.PAYMENTMETHOD"), noSort: true },
              { id: "paymentAmount", label: t("ORDERS.LABEL.PAYMENTAMOUNT"), noSort: true },
              { id: "isPaid", label: t("ORDERS.LABEL.ISPAID"), noSort: true },
              { id: "updatedAt", label: t("MODELLING.COMMON.UPDATEDAT"), noSort: true }
            ]}
            items={order.OrderPayments}
            filters={{}}
            pagination={null}
            changedPage={() => {}}
            changedRowsPerPage={() => {}}
            changedSort={() => {}}
            // rowActions={() => {}}
            // rowActionsDisabled={() => {}}
            passingRef={null}
          />
        </>
      )}
    </>
  );
};

export default InspectOrderCtn;

// PropTypes
InspectOrderCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// // Styles
// const OrderFormWrapper = styled(FormWrapper)`
// ${templates.FORM.BASIC}

// & > .clear {
// margin-top: 1rem !important;
// }
// `;

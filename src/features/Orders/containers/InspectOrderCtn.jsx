import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { performGetOrder } from "../actions";
import { selectOrder } from "../reducers";

import OrderDetailList from "../components/OrderDetailList";
import OrderPaymentList from "../components/OrderPaymentList";

import DateDisplay from "../../shared/components/Data/DateDisplay";
import NumberDisplay from "../../shared/components/Data/NumberDisplay";
import OrderStatusDisplay from "../../shared/components/Data/OrderStatusDisplay";

const InspectOrderCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

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
          <h3>Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Order ID: </td>
                <td>{order.id}</td>
              </tr>
              <tr>
                <td>Customer ID: </td>
                <td>{order.userId}</td>
              </tr>
              <tr>
                <td>Status: </td>
                <td>
                  <OrderStatusDisplay status={order.Status} />
                </td>
              </tr>
              <tr>
                <td>Total Payment: </td>
                <td>
                  <NumberDisplay type="currency" value={order.totalPrice} />
                </td>
              </tr>
              <tr>
                <td>Applied Promotion ID: </td>
                <td>{order.appliedPromotion}</td>
              </tr>
              <tr>
                <td>Created at: </td>
                <td>
                  <DateDisplay value={order.createdAt} />
                </td>
              </tr>
              <tr>
                <td>Updated at: </td>
                <td>
                  <DateDisplay value={order.updatedAt} />
                </td>
              </tr>
            </tbody>
          </table>
          <h3>Payee</h3>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{`${order.payee_lastName} ${order.payee_firstName}`}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{order.payee_email}</td>
              </tr>
              <tr>
                <td>Phone: </td>
                <td>{order.payee_phone}</td>
              </tr>
              <tr>
                <td>Delivery Address: </td>
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
          <h3>Details</h3>
          <OrderDetailList
            loading={isLoadingOrder}
            success={isSuccessOrder}
            tableHead={[
              { id: "item_id", label: "Item ID", noSort: true },
              { id: "item_variationId", label: "Variation ID", noSort: true },
              { id: "item_name", label: "Item Name", noSort: true },
              { id: "item_price", label: "Unit Price", noSort: true },
              { id: "item_inventoryId", label: "Selected Inventory Item", noSort: true }
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
          <h3>Payment Tracking</h3>
          <OrderPaymentList
            loading={isLoadingOrder}
            success={isSuccessOrder}
            tableHead={[
              { id: "id", label: "Payment ID", noSort: true },
              { id: "paymentMethod", label: "Payment Method", noSort: true },
              { id: "paymentAmount", label: "Amount", noSort: true },
              { id: "isPaid", label: "Paid?", noSort: true },
              { id: "due", label: "Due Date", noSort: true }
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

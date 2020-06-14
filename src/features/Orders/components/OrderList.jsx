import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import iconVerify from "@iconify/icons-bx/bx-list-check";
import iconDelivery from "@iconify/icons-bx/bx-package";
import iconComplete from "@iconify/icons-bx/bx-check-circle";
import iconCancel from "@iconify/icons-bx/bx-x-circle";
import { useTranslation } from "react-i18next";

import Table from "../../shared/components/Data/Table";
import NumberDisplay from "../../shared/components/Data/NumberDisplay";
import DateDisplay, { dateDisplayString } from "../../shared/components/Data/DateDisplay";
import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import Tooltip from "../../shared/components/Data/Tooltip";
import OrderStatusDisplay from "../../shared/components/Data/OrderStatusDisplay";
import Button from "../../shared/components/Form/Button";

const OrderList = ({
  loading,
  success,
  tableHead,
  items,
  filters,
  pagination,
  changedPage,
  changedRowsPerPage,
  changedSort,
  rowActions,
  rowActionsDisabled,
  passingRef
}) => {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const displayingOrders = items.map(item => ({
      ...item,
      orderId: (
        <LinkDisplay to={`/orders/${item.id}`} weight={700}>
          {item.id}
        </LinkDisplay>
      ),
      userId: (
        <Tooltip
          title={
            <>
              <span>{`User ID: ${item.Customer.id}`}</span>
              <br />
              <span>{`Username: ${item.Customer.Account.username}`}</span>
            </>
          }
          interactive
        >
          <span>{item.Customer.Account.email}</span>
        </Tooltip>
      ),
      verifier: (
        <>
          {item.verifier && (
            <Tooltip
              title={
                <>
                  <span>{`Staff ID: ${item.Verifier.id}`}</span>
                  <br />
                  <span>{`Email: ${item.Verifier.Account.email}`}</span>
                </>
              }
              interactive
            >
              <span>{item.Verifier.Account.username}</span>
            </Tooltip>
          )}
        </>
      ),
      statusId: <OrderStatusDisplay status={item.Status} />,
      totalPrice: <NumberDisplay type="currency" value={item.totalPrice} />,
      downPayment: item.downPayment && <NumberDisplay type="currency" value={item.downPayment} />,
      createdAt: (
        <>
          <Tooltip
            title={`${t("MODELLING.COMMON.CREATEDAT")}: ${dateDisplayString(item.updatedAt)}`}
          >
            <span>
              <DateDisplay value={item.createdAt} />
            </span>
          </Tooltip>
        </>
      ),
      modify: (
        <>
          {item.statusId === "processing" && (
            <div style={{ display: "flex" }}>
              <Button
                color="default"
                onClick={() => rowActions.cancelOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1, marginLeft: "0.5rem" }}
              >
                <Icon icon={iconCancel} />
                <span>{t("ORDERS.LABEL.CANCEL")}</span>
              </Button>
            </div>
          )}
          {item.statusId === "ordered" && (
            <div style={{ display: "flex" }}>
              <Button
                color="default"
                onClick={() => rowActions.verifyOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1 }}
              >
                <Icon icon={iconVerify} />
                <span>{t("ORDERS.LABEL.VERIFY")}</span>
              </Button>
              <Button
                color="default"
                onClick={() => rowActions.cancelOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1, marginLeft: "0.5rem" }}
              >
                <Icon icon={iconCancel} />
                <span>{t("ORDERS.LABEL.CANCEL")}</span>
              </Button>
            </div>
          )}
          {item.statusId === "verified" && (
            <div style={{ display: "flex" }}>
              <Button
                color="default"
                onClick={() => rowActions.startDeliverOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1 }}
              >
                <Icon icon={iconDelivery} />
                <span>{t("ORDERS.LABEL.STARTDELIVERY")}</span>
              </Button>
              <Button
                color="default"
                onClick={() => rowActions.cancelOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1, marginLeft: "0.5rem" }}
              >
                <Icon icon={iconCancel} />
                <span>{t("ORDERS.LABEL.CANCEL")}</span>
              </Button>
            </div>
          )}
          {item.statusId === "delivering" && (
            <div style={{ display: "flex" }}>
              <Button
                color="default"
                onClick={() => rowActions.completeOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1 }}
              >
                <Icon icon={iconComplete} />
                <span>{t("ORDERS.LABEL.COMPLETE")}</span>
              </Button>
              <Button
                color="default"
                onClick={() => rowActions.cancelOrder(item)}
                disabled={rowActionsDisabled}
                style={{ flexGrow: 1, marginLeft: "0.5rem" }}
              >
                <Icon icon={iconCancel} />
                <span>{t("ORDERS.LABEL.CANCEL")}</span>
              </Button>
            </div>
          )}
        </>
      )
    }));
    setOrders(displayingOrders);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={orders}
          filters={filters}
          pagination={pagination}
          // Functions / Handlers
          onChangePage={changedPage}
          onChangeRowsPerPage={changedRowsPerPage}
          onChangeSort={changedSort}
          // Others
          passingRef={passingRef}
        />
      )}
      {!loading && !success && <p>Error</p>}
    </>
  );
};

export default OrderList;

// PropTypes
OrderList.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.shape({}).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  changedPage: PropTypes.func,
  changedRowsPerPage: PropTypes.func,
  changedSort: PropTypes.func,
  rowActions: PropTypes.shape({
    verifyOrder: PropTypes.func,
    startDeliverOrder: PropTypes.func,
    completeOrder: PropTypes.func,
    cancelOrder: PropTypes.func
  }).isRequired,
  rowActionsDisabled: PropTypes.bool.isRequired,
  passingRef: PropTypes.shape({})
};
OrderList.defaultProps = {
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

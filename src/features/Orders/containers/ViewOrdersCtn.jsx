import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { performGetOrders } from "../actions";
import { selectOrdersFilters, selectOrders } from "../reducers";
import { useOrderFilters, useOrderSubInfo } from "../hooks";

import ConfirmCancelOrder from "../pages/modals/ConfirmCancelOrder";
import ConfirmCompleteOrder from "../pages/modals/ConfirmCompleteOrder";

import OrderList from "../components/OrderList";
import OrderFilterForm from "../components/OrderFilterForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import {
  filterSubmitHandler,
  filtersReloadHandler,
  changePageHandler,
  changeRowsPerPageHandler,
  changeSortHandler
} from "../../../utils/filter.util";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewOrdersCtn = ({ initialFilters, tableHead }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const snackbar = useSnackbar();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectOrdersFilters);
  const fetchedOrders = useSelector(selectOrders.orders);
  const pagination = useSelector(selectOrders.pagination);
  const isLoadingOrders = useSelector(selectOrders.isLoadingOrders);
  const isSuccessOrders = useSelector(selectOrders.isSuccessOrders);

  const topRef = useRef(null);

  const isLoadingFilterForm = !useOrderSubInfo();
  useOrderFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  // Local UI States

  const [orders, setOrders] = useState([]);
  const [modalConfirmCompleteOrder, setModalConfirmCompleteOrder] = useState(null);
  const [modalConfirmCancelOrder, setModalConfirmCancelOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]); // eslint-disable-line

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetOrders, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetOrders, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetOrders, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetOrders, filters, { location, history, dispatch });
  };

  // Other Handlers
  const handleVerifyOrder = order => {
    history.push(`/orders/${order.id}/verify`);
  };

  const handleOnConfirmCompleteOrder = async order => {
    setIsUpdating(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      setModalConfirmCompleteOrder(null);
      await request("patch", `/orders/${order.id}/complete`);
      handleFiltersReload();
      snackbar.enqueueSnackbar("Updated order successfully!", {
        variant: "success"
      });
    } catch (e) {
      snackbar.enqueueSnackbar(e.response.data.message, {
        variant: "error"
      });
    }
    snackbar.closeSnackbar(loadingSb);
    setIsUpdating(false);
  };
  const handleOnConfirmCancelOrder = async order => {
    setIsUpdating(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      setModalConfirmCancelOrder(null);
      await request("patch", `/orders/${order.id}/cancel`);
      handleFiltersReload();
      snackbar.enqueueSnackbar("Updated order successfully!", {
        variant: "success"
      });
    } catch (e) {
      snackbar.enqueueSnackbar(e.response.data.message, {
        variant: "error"
      });
    }
    snackbar.closeSnackbar(loadingSb);
    setIsUpdating(false);
  };

  return (
    <>
      {/* MODALS */}
      <ConfirmCompleteOrder
        order={modalConfirmCompleteOrder}
        onClose={() => setModalConfirmCompleteOrder(null)}
        onConfirm={handleOnConfirmCompleteOrder}
      />
      <ConfirmCancelOrder
        order={modalConfirmCancelOrder}
        onClose={() => setModalConfirmCancelOrder(null)}
        onConfirm={handleOnConfirmCancelOrder}
      />
      {/* end MODALS */}
      <OrderFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <OrderFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingOrders}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </OrderFilterFormWrapper>
      <OrderList
        // Status
        loading={isLoadingOrders}
        success={isSuccessOrders}
        // Variables
        tableHead={tableHead}
        items={!isLoadingOrders ? orders : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        rowActions={{
          verifyOrder: order => handleVerifyOrder(order),
          completeOrder: order => setModalConfirmCompleteOrder(order),
          cancelOrder: order => setModalConfirmCancelOrder(order)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewOrdersCtn;

// PropTypes
ViewOrdersCtn.propTypes = {
  initialFilters: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    size: PropTypes.number,
    sort: PropTypes.string,
    sortDesc: PropTypes.bool
  }).isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

// Styles
const OrderFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;

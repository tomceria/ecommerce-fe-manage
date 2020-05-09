import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { performGetInventoryItems } from "../actions";
import { selectInventoryItemsFilters, selectInventoryItems } from "../reducers";
import { useInventoryItemFilters, useInventoryItemSubInfo } from "../hooks";

import InventoryItemList from "../components/InventoryItemList";
import InventoryItemFilterForm from "../components/InventoryItemFilterForm";
import FormWrapper from "../../shared/containers/FormWrapper";
// import request from "../../../utils/request.util";
import {
  filterSubmitHandler,
  filtersReloadHandler,
  changePageHandler,
  changeRowsPerPageHandler,
  changeSortHandler
} from "../../../utils/filter.util";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewInventoryItemsCtn = ({ initialFilters, tableHead }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectInventoryItemsFilters);
  const fetchedInventoryItems = useSelector(selectInventoryItems.inventoryItems);
  const pagination = useSelector(selectInventoryItems.pagination);
  const isLoadingInventoryItems = useSelector(selectInventoryItems.isLoadingInventoryItems);
  const isSuccessInventoryItems = useSelector(selectInventoryItems.isSuccessInventoryItems);

  const topRef = useRef(null);

  const isLoadingFilterForm = !useInventoryItemSubInfo();
  useInventoryItemFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  // Local UI States

  const [inventoryItems, setInventoryItems] = useState([]);

  // Effects

  useEffect(() => {
    setInventoryItems(fetchedInventoryItems);
  }, [fetchedInventoryItems]); // eslint-disable-line

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetInventoryItems, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetInventoryItems, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetInventoryItems, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetInventoryItems, filters, { location, history, dispatch });
  };

  return (
    <>
      {/* end MODALS */}
      <InventoryItemFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <InventoryItemFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingInventoryItems}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </InventoryItemFilterFormWrapper>
      <InventoryItemList
        // Status
        loading={isLoadingInventoryItems}
        success={isSuccessInventoryItems}
        // Variables
        tableHead={tableHead}
        items={!isLoadingInventoryItems ? inventoryItems : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        // rowActions={{
        // }}
        // rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewInventoryItemsCtn;

// PropTypes
ViewInventoryItemsCtn.propTypes = {
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
const InventoryItemFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;

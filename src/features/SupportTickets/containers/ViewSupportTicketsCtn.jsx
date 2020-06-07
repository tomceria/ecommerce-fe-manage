import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { performGetSupportTickets } from "../actions";
import { selectSupportTickets, selectSupportTicketsFilters } from "../reducers";
import { useSupportTicketSubInfo, useSupportTicketFilters } from "../hooks";

import SupportTicketList from "../components/SupportTicketList";
import SupportTicketFilterForm from "../components/SupportTicketFilterForm";
import FormWrapper from "../../shared/containers/FormWrapper";
// import request from "../../../utils/request.util";
import {
  filterSubmitHandler,
  filtersReloadHandler,
  changePageHandler,
  changeRowsPerPageHandler,
  changeSortHandler
} from "../../../utils/filter.util";

const ViewSupportTicketsCtn = ({ initialFilters, tableHead }) => {
  // Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectSupportTicketsFilters);
  const fetchedSupportTickets = useSelector(selectSupportTickets.supportTickets);
  const pagination = useSelector(selectSupportTickets.pagination);
  const isLoadingSupportTickets = useSelector(selectSupportTickets.isLoadingSupportTickets);
  const isSuccessSupportTickets = useSelector(selectSupportTickets.isSuccessSupportTickets);

  const topRef = useRef(null);

  const isLoadingFilterForm = !useSupportTicketSubInfo();
  useSupportTicketFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  // Local UI States

  const [supportTickets, setSupportTickets] = useState([]);

  // Effects

  useEffect(() => {
    setSupportTickets(fetchedSupportTickets);
  }, [fetchedSupportTickets]); // eslint-disable-line

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetSupportTickets, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetSupportTickets, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetSupportTickets, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetSupportTickets, filters, { location, history, dispatch });
  };

  return (
    <>
      <SupportTicketFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <SupportTicketFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingSupportTickets}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </SupportTicketFilterFormWrapper>
      <SupportTicketList
        // Status
        loading={isLoadingSupportTickets}
        success={isSuccessSupportTickets}
        // Variables
        tableHead={tableHead}
        items={!isLoadingSupportTickets ? supportTickets : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        rowActions={{}}
        rowActionsDisabled={false}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewSupportTicketsCtn;

// PropSupportTickets
ViewSupportTicketsCtn.propTypes = {
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
const SupportTicketFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
`;

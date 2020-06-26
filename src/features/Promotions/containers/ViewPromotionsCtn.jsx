import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { performGetPromotions } from "../actions";
import { selectPromotions, selectPromotionsFilters } from "../reducers";
import { usePromotionSubInfo, usePromotionFilters } from "../hooks";

import PromotionList from "../components/PromotionList";
import PromotionFilterForm from "../components/PromotionFilterForm";
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

const ViewPromotionsCtn = ({ initialFilters, tableHead }) => {
  // Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectPromotionsFilters);
  const fetchedPromotions = useSelector(selectPromotions.promotions);
  const pagination = useSelector(selectPromotions.pagination);
  const isLoadingPromotions = useSelector(selectPromotions.isLoadingPromotions);
  const isSuccessPromotions = useSelector(selectPromotions.isSuccessPromotions);

  const topRef = useRef(null);

  const isLoadingFilterForm = !usePromotionSubInfo();
  usePromotionFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  // Local UI States

  const [promotions, setPromotions] = useState([]);

  // Effects

  useEffect(() => {
    setPromotions(fetchedPromotions);
  }, [fetchedPromotions]); // eslint-disable-line

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetPromotions, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetPromotions, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetPromotions, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetPromotions, filters, { location, history, dispatch });
  };

  return (
    <>
      <PromotionFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <PromotionFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingPromotions}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </PromotionFilterFormWrapper>
      <PromotionList
        // Status
        loading={isLoadingPromotions}
        success={isSuccessPromotions}
        // Variables
        tableHead={tableHead}
        items={!isLoadingPromotions ? promotions : []}
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

export default ViewPromotionsCtn;

// PropPromotions
ViewPromotionsCtn.propTypes = {
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
const PromotionFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;

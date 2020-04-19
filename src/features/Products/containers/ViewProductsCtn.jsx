import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { performGetProducts } from "../actions";
import { selectProductsFilters, selectProducts } from "../reducers";
import { useProductFilters, useProductSubInfo } from "../hooks";
import ProductList from "../components/ProductList";
import ProductFilterForm from "../components/ProductFilterForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { scrollToRef } from "../../../utils/function.util";
import { queryParams } from "../../../utils/route.util";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewProductsCtn = ({ initialFilters, tableHead }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectProductsFilters);
  const fetchedProducts = useSelector(selectProducts.products);
  const pagination = useSelector(selectProducts.pagination);
  const isLoadingProducts = useSelector(selectProducts.isLoadingProducts);
  const isSuccessProducts = useSelector(selectProducts.isSuccessProducts);

  const topRef = useRef(null);

  const isLoadingFilterForm = !useProductSubInfo();
  useProductFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  const handleOnSubmit = data => {
    const newFilters = data;
    const finalFilters = { ...filters, ...newFilters, page: 1 };
    if (newFilters.brand && newFilters.category) {
      if (newFilters.brand === filters.brand) {
        finalFilters.brand = "";
      } else if (newFilters.category === filters.category) {
        finalFilters.category = "";
      }
    }
    filterFormFuncs.setValue([{ brand: finalFilters.brand }, { category: finalFilters.category }]);
    queryParams.set(finalFilters, location, history, "products");
    dispatch(performGetProducts(finalFilters));
  };

  const handleFiltersReload = () => {
    filterFormFuncs.handleSubmit(handleOnSubmit)();
  };

  const handleChangePage = page => {
    const finalFilters = { ...filters, page };
    queryParams.set(finalFilters, location, history, "products");
    dispatch(performGetProducts(finalFilters));
    scrollToRef(topRef);
  };

  const handleChangeRowsPerPage = event => {
    const finalFilters = {
      ...filters,
      page: 1,
      size: parseInt(event.target.value, 10)
    };
    queryParams.set(finalFilters, location, history, "products");
    dispatch(performGetProducts(finalFilters));
    scrollToRef(topRef);
  };

  const handleChangeSort = key => {
    const finalFilters = {
      ...filters,
      page: 1,
      sort: key,
      sortDesc: filters.sort === key ? !filters.sortDesc : false
    };
    queryParams.set(finalFilters, location, history, "products");
    dispatch(performGetProducts(finalFilters));
  };

  return (
    <>
      <ProductFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <ProductFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingProducts}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </ProductFilterFormWrapper>
      <ProductList
        // Status
        loading={isLoadingProducts}
        success={isSuccessProducts}
        // Variables
        tableHead={tableHead}
        items={!isLoadingProducts ? fetchedProducts : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewProductsCtn;

// PropTypes
ViewProductsCtn.propTypes = {
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
const ProductFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;

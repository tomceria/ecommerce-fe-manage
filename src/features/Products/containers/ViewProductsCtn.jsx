import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { performGetProducts } from "../actions";
import { selectProductsFilters, selectProducts } from "../reducers";
import { useProductFilters, useProductSubInfo } from "../hooks";
import ConfirmHideProduct from "../pages/modals/ConfirmHideProduct";

import ProductList from "../components/ProductList";
import ProductFilterForm from "../components/ProductFilterForm";
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

const ViewProductsCtn = ({ initialFilters, tableHead }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const snackbar = useSnackbar();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectProductsFilters);
  const fetchedProducts = useSelector(selectProducts.products);
  const pagination = useSelector(selectProducts.pagination);
  const isLoadingProducts = useSelector(selectProducts.isLoadingProducts);
  const isSuccessProducts = useSelector(selectProducts.isSuccessProducts);

  const topRef = useRef(null);

  const isLoadingFilterForm = !useProductSubInfo();
  useProductFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  // Local UI States

  const [products, setProducts] = useState([]);
  const [modalConfirmHideProduct, setModalConfirmHideProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetProducts, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetProducts, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetProducts, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetProducts, filters, { location, history, dispatch });
  };

  // Other Handlers
  const handleOnConfirmHideProduct = async product => {
    setIsUpdating(true);
    const newValue = !product.hidden;
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      setModalConfirmHideProduct(null);
      await request("patch", `/items/${product.id}/hidden`, {
        hidden: newValue
      });
      setProducts(prevState => {
        const newProducts = JSON.parse(JSON.stringify(prevState));
        newProducts.find(o => o.id === product.id).hidden = newValue;
        return newProducts;
      });
      snackbar.enqueueSnackbar(`${newValue ? "Hide" : "Unhide"} product successfully!`, {
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
      <ConfirmHideProduct
        product={modalConfirmHideProduct}
        onClose={() => setModalConfirmHideProduct(null)}
        onConfirm={handleOnConfirmHideProduct}
      />
      {/* end MODALS */}
      <ProductFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <ProductFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingProducts || isUpdating}
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
        items={!isLoadingProducts ? products : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        rowActions={{
          toggleHide: product => setModalConfirmHideProduct(product)
        }}
        rowActionsDisabled={isUpdating}
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

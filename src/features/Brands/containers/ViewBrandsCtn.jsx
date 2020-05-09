import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { performGetBrands } from "../actions";
import { selectBrands } from "../reducers";
// import { useBrandSubInfo } from "../hooks";

import BrandList from "../components/BrandList";
import request from "../../../utils/request.util";

const ViewBrandsCtn = ({ tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const fetchedBrands = useSelector(selectBrands.brands);
  // const pagination = useSelector(selectBrands.pagination);
  const isLoadingBrands = useSelector(selectBrands.isLoadingBrands);
  const isSuccessBrands = useSelector(selectBrands.isSuccessBrands);

  const topRef = useRef(null);

  // Local UI States

  const [brands, setBrands] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    dispatch(performGetBrands());
  }, []); // eslint-disable-line

  useEffect(() => {
    setBrands(fetchedBrands);
  }, [fetchedBrands]); // eslint-disable-line

  const handleSwapBrands = async (brand, isUp) => {
    setIsUpdating(true);
    const destObj = brands.find(o => brand.placing + (isUp ? -1 : 1) === o.placing);
    if (!destObj) {
      return false;
    }
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/brands/${brand.id}/swap`, { brand2Id: destObj.id });
      setBrands(prevState => {
        const newBrands = JSON.parse(JSON.stringify(prevState));
        const sourceIndex = newBrands.findIndex(o => o.id === brand.id);
        const destIndex = newBrands.findIndex(o => o.id === destObj.id);
        const oldPlacings = [brand.placing, destObj.placing];
        const temp = newBrands[sourceIndex];
        newBrands[sourceIndex] = newBrands[destIndex];
        newBrands[destIndex] = temp;
        // Old placing assigning
        [newBrands[sourceIndex].placing, newBrands[destIndex].placing] = oldPlacings;
        return newBrands;
      });
      snackbar.enqueueSnackbar("Swapped successfully!", {
        variant: "success"
      });
    } catch (e) {
      snackbar.enqueueSnackbar(e.response.data.message, {
        variant: "error"
      });
    }
    snackbar.closeSnackbar(loadingSb);
    setIsUpdating(false);
    return true;
  };

  return (
    <>
      <BrandList
        // Status
        loading={isLoadingBrands}
        success={isSuccessBrands}
        // Variables
        tableHead={tableHead}
        items={!isLoadingBrands ? brands : []}
        filters={{ sort: "createdAt", sortDesc: true }}
        // pagination={pagination}
        // Functions / Handlers
        changedPage={() => {}}
        changedRowsPerPage={() => {}}
        changedSort={() => {}}
        // Action Handlers
        rowActions={{
          swap: (brand, isUp) => handleSwapBrands(brand, isUp)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewBrandsCtn;

// PropBrands
ViewBrandsCtn.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { performGetScales } from "../actions";
import { selectScales } from "../reducers";
// import { useScaleSubInfo } from "../hooks";

import ScaleList from "../components/ScaleList";
import request from "../../../utils/request.util";

const ViewScalesCtn = ({ tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const fetchedScales = useSelector(selectScales.scales);
  // const pagination = useSelector(selectScales.pagination);
  const isLoadingScales = useSelector(selectScales.isLoadingScales);
  const isSuccessScales = useSelector(selectScales.isSuccessScales);

  const topRef = useRef(null);

  // Local UI States

  const [scales, setScales] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    dispatch(performGetScales());
  }, []); // eslint-disable-line

  useEffect(() => {
    setScales(fetchedScales);
  }, [fetchedScales]); // eslint-disable-line

  const handleSwapScales = async (scale, isUp) => {
    setIsUpdating(true);
    const destObj = scales.find(o => scale.placing + (isUp ? -1 : 1) === o.placing);
    if (!destObj) {
      return false;
    }
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/scales/${scale.id}/swap`, { scale2Id: destObj.id });
      setScales(prevState => {
        const newScales = JSON.parse(JSON.stringify(prevState));
        const sourceIndex = newScales.findIndex(o => o.id === scale.id);
        const destIndex = newScales.findIndex(o => o.id === destObj.id);
        const oldPlacings = [scale.placing, destObj.placing];
        const temp = newScales[sourceIndex];
        newScales[sourceIndex] = newScales[destIndex];
        newScales[destIndex] = temp;
        // Old placing assigning
        [newScales[sourceIndex].placing, newScales[destIndex].placing] = oldPlacings;
        return newScales;
      });
      snackbar.enqueueSnackbar(t("FORM.COMMON.SUCCESS"), {
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
      <ScaleList
        // Status
        loading={isLoadingScales}
        success={isSuccessScales}
        // Variables
        tableHead={tableHead}
        items={!isLoadingScales ? scales : []}
        filters={{ sort: "createdAt", sortDesc: true }}
        // pagination={pagination}
        // Functions / Handlers
        changedPage={() => {}}
        changedRowsPerPage={() => {}}
        changedSort={() => {}}
        // Action Handlers
        rowActions={{
          swap: (scale, isUp) => handleSwapScales(scale, isUp)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewScalesCtn;

// PropTypes
ViewScalesCtn.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

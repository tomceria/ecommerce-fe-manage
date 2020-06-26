import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { performGetMakers } from "../actions";
import { selectMakers } from "../reducers";
// import { useMakerSubInfo } from "../hooks";

import MakerList from "../components/MakerList";
import request from "../../../utils/request.util";

const ViewMakersCtn = ({ tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const fetchedMakers = useSelector(selectMakers.makers);
  // const pagination = useSelector(selectMakers.pagination);
  const isLoadingMakers = useSelector(selectMakers.isLoadingMakers);
  const isSuccessMakers = useSelector(selectMakers.isSuccessMakers);

  const topRef = useRef(null);

  // Local UI States

  const [makers, setMakers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    dispatch(performGetMakers());
  }, []); // eslint-disable-line

  useEffect(() => {
    setMakers(fetchedMakers);
  }, [fetchedMakers]); // eslint-disable-line

  const handleSwapMakers = async (maker, isUp) => {
    setIsUpdating(true);
    const destObj = makers.find(o => maker.placing + (isUp ? -1 : 1) === o.placing);
    if (!destObj) {
      return false;
    }
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/makers/${maker.id}/swap`, { maker2Id: destObj.id });
      setMakers(prevState => {
        const newMakers = JSON.parse(JSON.stringify(prevState));
        const sourceIndex = newMakers.findIndex(o => o.id === maker.id);
        const destIndex = newMakers.findIndex(o => o.id === destObj.id);
        const oldPlacings = [maker.placing, destObj.placing];
        const temp = newMakers[sourceIndex];
        newMakers[sourceIndex] = newMakers[destIndex];
        newMakers[destIndex] = temp;
        // Old placing assigning
        [newMakers[sourceIndex].placing, newMakers[destIndex].placing] = oldPlacings;
        return newMakers;
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
      <MakerList
        // Status
        loading={isLoadingMakers}
        success={isSuccessMakers}
        // Variables
        tableHead={tableHead}
        items={!isLoadingMakers ? makers : []}
        filters={{ sort: "createdAt", sortDesc: true }}
        // pagination={pagination}
        // Functions / Handlers
        changedPage={() => {}}
        changedRowsPerPage={() => {}}
        changedSort={() => {}}
        // Action Handlers
        rowActions={{
          swap: (maker, isUp) => handleSwapMakers(maker, isUp)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewMakersCtn;

// PropTypes
ViewMakersCtn.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

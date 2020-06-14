import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { performGetTypes } from "../actions";
import { selectTypes } from "../reducers";
// import { useTypeSubInfo } from "../hooks";

import TypeList from "../components/TypeList";
import request from "../../../utils/request.util";

const ViewTypesCtn = ({ tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const fetchedTypes = useSelector(selectTypes.types);
  // const pagination = useSelector(selectTypes.pagination);
  const isLoadingTypes = useSelector(selectTypes.isLoadingTypes);
  const isSuccessTypes = useSelector(selectTypes.isSuccessTypes);

  const topRef = useRef(null);

  // Local UI States

  const [types, setTypes] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    dispatch(performGetTypes());
  }, []); // eslint-disable-line

  useEffect(() => {
    setTypes(fetchedTypes);
  }, [fetchedTypes]); // eslint-disable-line

  const handleSwapTypes = async (type, isUp) => {
    setIsUpdating(true);
    const destObj = types.find(o => type.placing + (isUp ? -1 : 1) === o.placing);
    if (!destObj) {
      return false;
    }
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/types/${type.id}/swap`, { type2Id: destObj.id });
      setTypes(prevState => {
        const newTypes = JSON.parse(JSON.stringify(prevState));
        const sourceIndex = newTypes.findIndex(o => o.id === type.id);
        const destIndex = newTypes.findIndex(o => o.id === destObj.id);
        const oldPlacings = [type.placing, destObj.placing];
        const temp = newTypes[sourceIndex];
        newTypes[sourceIndex] = newTypes[destIndex];
        newTypes[destIndex] = temp;
        // Old placing assigning
        [newTypes[sourceIndex].placing, newTypes[destIndex].placing] = oldPlacings;
        return newTypes;
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
      <TypeList
        // Status
        loading={isLoadingTypes}
        success={isSuccessTypes}
        // Variables
        tableHead={tableHead}
        items={!isLoadingTypes ? types : []}
        filters={{ sort: "createdAt", sortDesc: true }}
        // pagination={pagination}
        // Functions / Handlers
        changedPage={() => {}}
        changedRowsPerPage={() => {}}
        changedSort={() => {}}
        // Action Handlers
        rowActions={{
          swap: (type, isUp) => handleSwapTypes(type, isUp)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewTypesCtn;

// PropTypes
ViewTypesCtn.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { performGetAttributes } from "../actions";
import { selectAttributes } from "../reducers";
// import { useAttributeSubInfo } from "../hooks";

import AttributeList from "../components/AttributeList";
import request from "../../../utils/request.util";

const ViewAttributesCtn = ({ tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const fetchedAttributes = useSelector(selectAttributes.attributes);
  // const pagination = useSelector(selectAttributes.pagination);
  const isLoadingAttributes = useSelector(selectAttributes.isLoadingAttributes);
  const isSuccessAttributes = useSelector(selectAttributes.isSuccessAttributes);

  const topRef = useRef(null);

  // Local UI States

  const [attributes, setAttributes] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    dispatch(performGetAttributes());
  }, []); // eslint-disable-line

  useEffect(() => {
    setAttributes(fetchedAttributes);
  }, [fetchedAttributes]); // eslint-disable-line

  const handleSwapAttributes = async (attribute, isUp) => {
    setIsUpdating(true);
    const destObj = attributes.find(o => attribute.placing + (isUp ? -1 : 1) === o.placing);
    if (!destObj) {
      return false;
    }
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/attributes/${attribute.id}/swap`, { attribute2Id: destObj.id });
      setAttributes(prevState => {
        const newAttributes = JSON.parse(JSON.stringify(prevState));
        const sourceIndex = newAttributes.findIndex(o => o.id === attribute.id);
        const destIndex = newAttributes.findIndex(o => o.id === destObj.id);
        const oldPlacings = [attribute.placing, destObj.placing];
        const temp = newAttributes[sourceIndex];
        newAttributes[sourceIndex] = newAttributes[destIndex];
        newAttributes[destIndex] = temp;
        // Old placing assigning
        [newAttributes[sourceIndex].placing, newAttributes[destIndex].placing] = oldPlacings;
        return newAttributes;
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
      <AttributeList
        // Status
        loading={isLoadingAttributes}
        success={isSuccessAttributes}
        // Variables
        tableHead={tableHead}
        items={!isLoadingAttributes ? attributes : []}
        filters={{ sort: "createdAt", sortDesc: true }}
        // pagination={pagination}
        // Functions / Handlers
        changedPage={() => {}}
        changedRowsPerPage={() => {}}
        changedSort={() => {}}
        // Action Handlers
        rowActions={{
          swap: (attribute, isUp) => handleSwapAttributes(attribute, isUp)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewAttributesCtn;

// PropAttributes
ViewAttributesCtn.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

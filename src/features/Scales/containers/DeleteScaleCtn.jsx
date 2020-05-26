import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";

import { selectScale } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteScale from "../pages/modals/ConfirmDeleteScale";
import Button from "../../shared/components/Form/Button";

const DeleteScaleCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();

  const scale = useSelector(selectScale.scale);
  const isLoadingScale = useSelector(selectScale.isLoadingScale);
  const isSuccessScale = useSelector(selectScale.isSuccessScale);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!scale) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/scales/${scale.id}`);
      snackbar.enqueueSnackbar("Deleted scale successfully", {
        variant: "success"
      });
      setModalOn(null);
    } catch (e) {
      snackbar.enqueueSnackbar(e.response.data.message, {
        variant: "error"
      });
    }
    snackbar.closeSnackbar(loadingSb);
    setIsProcessing(false);
    history.replace("/products/scales");
    return true;
  };

  return (
    <>
      <ConfirmDeleteScale
        scale={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(scale)}
        disabled={isLoadingScale || !isSuccessScale}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteScaleCtn;

// PropTypes

// Styles

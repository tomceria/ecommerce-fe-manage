import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";

import { selectMaker } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteMaker from "../pages/modals/ConfirmDeleteMaker";
import Button from "../../shared/components/Form/Button";

const DeleteMakerCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();

  const maker = useSelector(selectMaker.maker);
  const isLoadingMaker = useSelector(selectMaker.isLoadingMaker);
  const isSuccessMaker = useSelector(selectMaker.isSuccessMaker);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!maker) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/makers/${maker.id}`);
      snackbar.enqueueSnackbar("Deleted maker successfully", {
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
    history.replace("/products/makers");
    return true;
  };

  return (
    <>
      <ConfirmDeleteMaker
        maker={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(maker)}
        disabled={isLoadingMaker || !isSuccessMaker}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteMakerCtn;

// PropTypes

// Styles

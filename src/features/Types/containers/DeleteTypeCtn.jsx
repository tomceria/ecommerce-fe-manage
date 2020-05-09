import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";

import { selectType } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteType from "../pages/modals/ConfirmDeleteType";
import Button from "../../shared/components/Form/Button";

const DeleteTypeCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();

  const type = useSelector(selectType.type);
  const isLoadingType = useSelector(selectType.isLoadingType);
  const isSuccessType = useSelector(selectType.isSuccessType);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!type) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/types/${type.id}`);
      snackbar.enqueueSnackbar("Deleted type successfully", {
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
    history.replace("/products/types");
    return true;
  };

  return (
    <>
      <ConfirmDeleteType
        type={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(type)}
        disabled={isLoadingType || !isSuccessType}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteTypeCtn;

// PropTypes

// Styles

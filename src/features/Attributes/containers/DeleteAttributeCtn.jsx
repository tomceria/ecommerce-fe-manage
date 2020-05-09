import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";

import { selectAttribute } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteAttribute from "../pages/modals/ConfirmDeleteAttribute";
import Button from "../../shared/components/Form/Button";

const DeleteAttributeCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();

  const attribute = useSelector(selectAttribute.attribute);
  const isLoadingAttribute = useSelector(selectAttribute.isLoadingAttribute);
  const isSuccessAttribute = useSelector(selectAttribute.isSuccessAttribute);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!attribute) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/attributes/${attribute.id}`);
      snackbar.enqueueSnackbar("Deleted attribute successfully", {
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
    history.replace("/products/attributes");
    return true;
  };

  return (
    <>
      <ConfirmDeleteAttribute
        attribute={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(attribute)}
        disabled={isLoadingAttribute || !isSuccessAttribute}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteAttributeCtn;

// PropTypes

// Styles

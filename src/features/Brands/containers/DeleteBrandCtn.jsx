import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";

import { selectBrand } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteBrand from "../pages/modals/ConfirmDeleteBrand";
import Button from "../../shared/components/Form/Button";

const DeleteBrandCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();

  const brand = useSelector(selectBrand.brand);
  const isLoadingBrand = useSelector(selectBrand.isLoadingBrand);
  const isSuccessBrand = useSelector(selectBrand.isSuccessBrand);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!brand) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/brands/${brand.id}`);
      snackbar.enqueueSnackbar("Deleted brand successfully", {
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
    history.replace("/products/brands");
    return true;
  };

  return (
    <>
      <ConfirmDeleteBrand
        brand={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(brand)}
        disabled={isLoadingBrand || !isSuccessBrand}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteBrandCtn;

// PropTypes

// Styles

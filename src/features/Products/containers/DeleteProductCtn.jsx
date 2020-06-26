import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";
import { useTranslation } from "react-i18next";

import { selectProduct } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteProduct from "../pages/modals/ConfirmDeleteProduct";
import Button from "../../shared/components/Form/Button";

const DeleteProductCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const product = useSelector(selectProduct.product);
  const isLoadingProduct = useSelector(selectProduct.isLoadingProduct);
  const isSuccessProduct = useSelector(selectProduct.isSuccessProduct);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!product) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/items/${product.id}`);
      snackbar.enqueueSnackbar(t("FORM.COMMON.SUCCESS"), {
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
    history.replace("/products");
    return true;
  };

  return (
    <>
      <ConfirmDeleteProduct
        product={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(product)}
        disabled={isLoadingProduct || !isSuccessProduct}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteProductCtn;

// PropTypes

// Styles

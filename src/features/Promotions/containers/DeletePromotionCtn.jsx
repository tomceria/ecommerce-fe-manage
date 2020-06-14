import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";
import { useTranslation } from "react-i18next";

import { selectPromotion } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeletePromotion from "../pages/modals/ConfirmDeletePromotion";
import Button from "../../shared/components/Form/Button";

const DeletePromotionCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const promotion = useSelector(selectPromotion.promotion);
  const isLoadingPromotion = useSelector(selectPromotion.isLoadingPromotion);
  const isSuccessPromotion = useSelector(selectPromotion.isSuccessPromotion);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!promotion) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/promotions/${promotion.id}`);
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
    history.replace("/promotions");
    return true;
  };

  return (
    <>
      <ConfirmDeletePromotion
        promotion={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(promotion)}
        disabled={isLoadingPromotion || !isSuccessPromotion}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeletePromotionCtn;

// PropTypes

// Styles

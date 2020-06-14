import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconTrash from "@iconify/icons-bx/bx-trash";
import { useTranslation } from "react-i18next";

import { selectSupportTicket } from "../reducers";
import request from "../../../utils/request.util";
import ConfirmDeleteSupportTicket from "../pages/modals/ConfirmDeleteSupportTicket";
import Button from "../../shared/components/Form/Button";

const DeleteSupportTicketCtn = () => {
  const history = useHistory();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const supportTicket = useSelector(selectSupportTicket.supportTicket);
  const isLoadingSupportTicket = useSelector(selectSupportTicket.isLoadingSupportTicket);
  const isSuccessSupportTicket = useSelector(selectSupportTicket.isSuccessSupportTicket);

  const [modalOn, setModalOn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnConfirm = async () => {
    if (!supportTicket) {
      return false;
    }
    setIsProcessing(true);
    const loadingSb = snackbar.enqueueSnackbar(t("FORM.COMMON.LOADING"), {
      variant: "warning",
      persist: true
    });
    try {
      await request("delete", `/support/${supportTicket.id}`);
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
    history.replace("/support");
    return true;
  };

  return (
    <>
      <ConfirmDeleteSupportTicket
        supportTicket={modalOn}
        onClose={() => setModalOn(null)}
        onConfirm={handleOnConfirm}
        disabled={isProcessing}
      />
      <Button
        color="default"
        onClick={() => setModalOn(supportTicket)}
        disabled={isLoadingSupportTicket || !isSuccessSupportTicket}
        style={{ height: "100%" }}
      >
        <Icon icon={iconTrash} className="icon" />
      </Button>
    </>
  );
};

export default DeleteSupportTicketCtn;

// PropTypes

// Styles

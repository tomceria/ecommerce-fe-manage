import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmCompleteOrder = ({ order, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!order} title={t("ORDERS.DIALOG.COMPLETE0")} onClose={onClose}>
      <StyledContainer>
        {order && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("ORDERS.DIALOG.COMPLETE1")}</b>
              <br />
              <b>{t("FORM.COMMON.UNDONE")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("ORDERS.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{order.id}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(order)}>
                {t("FORM.COMMON.CONFIRM")}
              </Button>
              <Button color="default" onClick={onClose}>
                {t("FORM.COMMON.CANCEL")}
              </Button>
            </div>
          </>
        )}
      </StyledContainer>
    </Modal>
  );
};

export default ConfirmCompleteOrder;

// PropTypes
ConfirmCompleteOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hidden: PropTypes.bool
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
ConfirmCompleteOrder.defaultProps = {
  order: undefined
};

// Styles
const StyledContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > .actions > * {
    margin: 0 1rem;
  }
`;

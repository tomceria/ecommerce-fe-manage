import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteSupportTicket = ({ supportTicket, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!supportTicket} title={t("SUPPORT.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {supportTicket && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("SUPPORT.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("SUPPORT.DIALOG.DELETE2")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("SUPPORT.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{supportTicket.id}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(supportTicket)} disabled={disabled}>
                {t("FORM.COMMON.CONFIRM")}
              </Button>
              <Button color="default" onClick={onClose} disabled={disabled}>
                {t("FORM.COMMON.CANCEL")}
              </Button>
            </div>
          </>
        )}
      </StyledContainer>
    </Modal>
  );
};

export default ConfirmDeleteSupportTicket;

// PropTypes
ConfirmDeleteSupportTicket.propTypes = {
  supportTicket: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeleteSupportTicket.defaultProps = {
  supportTicket: undefined,
  disabled: undefined
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

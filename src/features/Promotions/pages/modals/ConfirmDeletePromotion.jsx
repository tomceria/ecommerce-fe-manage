import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeletePromotion = ({ promotion, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!promotion} title={t("PROMOTIONS.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {promotion && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("PROMOTIONS.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("PROMOTIONS.DIALOG.DELETE2")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("PROMOTIONS.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{promotion.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>{t("PROMOTIONS.MODEL.NAME.LABEL")}</b>
                  </td>
                  <td>{promotion.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(promotion)} disabled={disabled}>
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

export default ConfirmDeletePromotion;

// PropTypes
ConfirmDeletePromotion.propTypes = {
  promotion: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeletePromotion.defaultProps = {
  promotion: undefined,
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

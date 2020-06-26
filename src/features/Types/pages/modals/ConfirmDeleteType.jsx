import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteType = ({ type, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!type} title={t("TYPES.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {type && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("TYPES.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("TYPES.DIALOG.DELETE2")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("TYPES.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{type.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>{t("TYPES.MODEL.NAME.LABEL")}</b>
                  </td>
                  <td>{type.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(type)} disabled={disabled}>
                Confirm
              </Button>
              <Button color="default" onClick={onClose} disabled={disabled}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </StyledContainer>
    </Modal>
  );
};

export default ConfirmDeleteType;

// PropTypes
ConfirmDeleteType.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeleteType.defaultProps = {
  type: undefined,
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

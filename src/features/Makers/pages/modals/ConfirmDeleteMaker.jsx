import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteMaker = ({ maker, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!maker} title={t("MAKERS.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {maker && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("MAKERS.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("MAKERS.DIALOG.DELETE2")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("MAKERS.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{maker.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>{t("MAKERS.MODEL.NAME.LABEL")}</b>
                  </td>
                  <td>{maker.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(maker)} disabled={disabled}>
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

export default ConfirmDeleteMaker;

// PropTypes
ConfirmDeleteMaker.propTypes = {
  maker: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeleteMaker.defaultProps = {
  maker: undefined,
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

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteBrand = ({ brand, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!brand} title={t("BRANDS.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {brand && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("BRANDS.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("BRANDS.DIALOG.DELETE2")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{t("BRANDS.MODEL.ID.LABEL")}</b>
                  </td>
                  <td>{brand.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>{t("BRANDS.MODEL.NAME.LABEL")}</b>
                  </td>
                  <td>{brand.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(brand)} disabled={disabled}>
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

export default ConfirmDeleteBrand;

// PropTypes
ConfirmDeleteBrand.propTypes = {
  brand: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeleteBrand.defaultProps = {
  brand: undefined,
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

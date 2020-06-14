import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmLockAccountUser = ({ product, onClose, onConfirm }) => {
  const { t } = useTranslation();

  const isPerformingHide = product && !product.hidden;

  return (
    <Modal
      in={!!product}
      title={isPerformingHide ? t("PRODUCTS.DIALOG.HIDE0") : t("PRODUCTS.DIALOG.UNHIDE0")}
      onClose={onClose}
    >
      <StyledContainer>
        {product && (
          <>
            <p>
              <b>{isPerformingHide ? t("PRODUCTS.DIALOG.HIDE1") : t("PRODUCTS.DIALOG.UNHIDE1")}</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{`${t("PRODUCTS.MODEL.ID.LABEL")}:`}</b>
                  </td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>{`${t("PRODUCTS.MODEL.NAME.LABEL")}:`}</b>
                  </td>
                  <td>{product.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(product)}>
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

export default ConfirmLockAccountUser;

// PropTypes
ConfirmLockAccountUser.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hidden: PropTypes.bool
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
ConfirmLockAccountUser.defaultProps = {
  product: undefined
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

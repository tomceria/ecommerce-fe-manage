import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteProduct = ({ product, onClose, onConfirm, disabled }) => {
  const { t } = useTranslation();

  return (
    <Modal in={!!product} title={t("PRODUCTS.DIALOG.DELETE0")} onClose={onClose}>
      <StyledContainer>
        {product && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>{t("PRODUCTS.DIALOG.DELETE1")}</b>
              <br />
              <b>{t("PRODUCTS.DIALOG.DELETE2")}</b>
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
              <Button color="primary" onClick={() => onConfirm(product)} disabled={disabled}>
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

export default ConfirmDeleteProduct;

// PropTypes
ConfirmDeleteProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ConfirmDeleteProduct.defaultProps = {
  product: undefined,
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

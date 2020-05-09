import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteProduct = ({ product, onClose, onConfirm, disabled }) => {
  return (
    <Modal in={!!product} title="Deleting Product" onClose={onClose}>
      <StyledContainer>
        {product && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>Are you sure wanted to delete this product?</b>
              <br />
              <b>WARNING: Any related items of this Product will be deleted</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>ID:</b>
                  </td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>Name:</b>
                  </td>
                  <td>{product.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(product)} disabled={disabled}>
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

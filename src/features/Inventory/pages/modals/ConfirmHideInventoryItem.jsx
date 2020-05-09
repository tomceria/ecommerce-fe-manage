import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmLockAccountUser = ({ product, onClose, onConfirm }) => {
  const isPerformingHide = product && !product.hidden;

  return (
    <Modal
      in={!!product}
      title={`${isPerformingHide ? "Hiding" : "Unhiding"} product`}
      onClose={onClose}
    >
      <StyledContainer>
        {product && (
          <>
            <p>
              <b>
                Are you sure wanted to
                {isPerformingHide ? " hide " : " unhide "}
                this product?
              </b>
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
              <Button color="primary" onClick={() => onConfirm(product)}>
                Confirm
              </Button>
              <Button color="default" onClick={onClose}>
                Cancel
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

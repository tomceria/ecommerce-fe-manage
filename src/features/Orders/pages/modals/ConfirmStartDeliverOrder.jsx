import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmCompleteOrder = ({ order, onClose, onConfirm }) => {
  return (
    <Modal in={!!order} title="Start delivery for order" onClose={onClose}>
      <StyledContainer>
        {order && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>Are you sure wanted to start delivery for this order?</b>
              <br />
              <b>This action cannot be undone.</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>ID:</b>
                  </td>
                  <td>{order.id}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(order)}>
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

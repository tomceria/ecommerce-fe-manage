import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteSupportTicket = ({ supportTicket, onClose, onConfirm, disabled }) => {
  return (
    <Modal in={!!supportTicket} title="Deleting Support Ticket" onClose={onClose}>
      <StyledContainer>
        {supportTicket && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>Are you sure wanted to delete this support ticket?</b>
              <br />
              <b>WARNING: Any related items of this Support Ticket will be deleted</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>ID:</b>
                  </td>
                  <td>{supportTicket.id}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(supportTicket)} disabled={disabled}>
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

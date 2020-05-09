import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmDeleteType = ({ type, onClose, onConfirm, disabled }) => {
  return (
    <Modal in={!!type} title="Deleting Type" onClose={onClose}>
      <StyledContainer>
        {type && (
          <>
            <p style={{ textAlign: "center" }}>
              <b>Are you sure wanted to delete this type?</b>
              <br />
              <b>WARNING: Any related items of this Type will be deleted</b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>ID:</b>
                  </td>
                  <td>{type.id}</td>
                </tr>
                <tr>
                  <td>
                    <b>Name:</b>
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

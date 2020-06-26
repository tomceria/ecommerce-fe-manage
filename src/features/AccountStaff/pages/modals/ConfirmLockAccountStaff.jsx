import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import Button from "../../../shared/components/Form/Button";

const ConfirmLockAccountStaff = ({ account, onClose, onConfirm }) => {
  const isLocking = account && !account.Staff.locked;

  return (
    <Modal
      in={!!account}
      title={`${isLocking ? "Locking" : "Unlocking"} staff's access`}
      onClose={onClose}
    >
      <StyledContainer>
        {account && (
          <>
            <p>
              <b>
                Are you sure wanted to
                {isLocking ? " lock " : " unlock "}
                this account&apos;s access?
              </b>
            </p>
            <table style={{ marginBottom: "2rem" }}>
              <tbody>
                <tr>
                  <td>
                    <b>Username:</b>
                  </td>
                  <td>{account.username}</td>
                </tr>
                <tr>
                  <td>
                    <b>Email:</b>
                  </td>
                  <td>{account.email}</td>
                </tr>
                <tr>
                  <td>
                    <b>Role:</b>
                  </td>
                  <td>{account.Staff.Role.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <Button color="primary" onClick={() => onConfirm(account)}>
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

export default ConfirmLockAccountStaff;

// PropTypes
ConfirmLockAccountStaff.propTypes = {
  account: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    Staff: PropTypes.shape({
      locked: PropTypes.bool,
      Role: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
ConfirmLockAccountStaff.defaultProps = {
  account: undefined
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

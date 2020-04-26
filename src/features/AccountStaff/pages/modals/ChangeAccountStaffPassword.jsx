import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../../../shared/components/UI/Modal";
import ChangeAccountStaffPasswordCtn from "../../containers/ChangeAccountStaffPasswordCtn";

const ChangeAccountStaffPassword = ({ account, onClose, onConfirm }) => {
  return (
    <Modal in={!!account} title="Change account's password" onClose={onClose}>
      <StyledContainer>
        {account && (
          <>
            <p>
              <b>You&apos;re resetting password for:</b>
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
            <ChangeAccountStaffPasswordCtn subjectId={account.Staff.id} onSubmit={onConfirm} />
          </>
        )}
      </StyledContainer>
    </Modal>
  );
};

export default ChangeAccountStaffPassword;

// PropTypes
ChangeAccountStaffPassword.propTypes = {
  account: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    Staff: PropTypes.shape({
      id: PropTypes.string,
      Role: PropTypes.shape({
        name: PropTypes.string
      })
    })
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
ChangeAccountStaffPassword.defaultProps = {
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

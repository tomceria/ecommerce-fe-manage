import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import AccountStaffPasswordForm from "../components/AccountStaffPasswordForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const ChangeAccountStaffPasswordCtn = ({ subjectId, onSubmit: modalConfirmed }) => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { password, password2 } = data;
    setErrRes(null);
    try {
      await request("patch", `/accountStaff/${subjectId}/password`, {
        password,
        password2
      });
      modalConfirmed();
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <AccountStaffPasswordFormWrapper
      formFuncs={formFuncs}
      submitted={handleOnSubmit}
      errRes={errRes}
    >
      <AccountStaffPasswordForm />
    </AccountStaffPasswordFormWrapper>
  );
};

export default ChangeAccountStaffPasswordCtn;

// PropTypes
ChangeAccountStaffPasswordCtn.propTypes = {
  subjectId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

// Styles
const AccountStaffPasswordFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
  ${templates.FORM.MODAL}

  & > .clear {
    margin-top: 1rem !important;
  }
`;

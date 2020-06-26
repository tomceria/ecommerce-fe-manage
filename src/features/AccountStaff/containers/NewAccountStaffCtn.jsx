import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import AccountStaffForm from "../components/AccountStaffForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewAccountStaffCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { username, email, password, password2, roleId, locked } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/accountStaff/signup", {
        username,
        email,
        password,
        password2,
        roleId,
        locked
      });
      setErrRes(result);
      handleOnClear(formFuncs, model);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <AccountStaffFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <AccountStaffForm onClear={() => handleOnClear(formFuncs, model)} />
    </AccountStaffFormWrapper>
  );
};

export default NewAccountStaffCtn;

// Styles
const AccountStaffFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;

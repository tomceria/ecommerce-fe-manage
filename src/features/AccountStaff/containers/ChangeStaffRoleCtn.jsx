import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import StaffRoleForm from "../components/StaffRoleForm";
import FormWrapper from "../../shared/containers/FormWrapper";

const ChangeStaffRoleCtn = ({ subject, onSubmit: fieldChanged }) => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    setErrRes(null);
    const { roleId } = data;
    await fieldChanged(subject, roleId);
  };

  return (
    <StaffRoleFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <StaffRoleForm subject={subject} submitted={handleOnSubmit} />
    </StaffRoleFormWrapper>
  );
};

export default ChangeStaffRoleCtn;

// PropTypes
ChangeStaffRoleCtn.propTypes = {
  subject: PropTypes.shape({
    Staff: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

// Styles
const StaffRoleFormWrapper = styled(FormWrapper)``;

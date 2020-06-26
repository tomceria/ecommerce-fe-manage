import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { performDoAuthenticate } from "../actions";
import { useHandler } from "../../shared/hooks";
import request from "../../../utils/request.util";
import FormWrapper from "../../shared/containers/FormWrapper";
import LoginForm from "../components/LoginForm";

const LoginFormCtn = ({ onLoggingIn }) => {
  const dispatch = useDispatch();

  const [errRes, setErrRes] = useState({});

  const formFuncs = useForm();

  const { isSubmitting } = formFuncs.formState;

  useHandler(onLoggingIn, [isSubmitting]);

  const handleOnSubmit = async data => {
    const { username, password, remember } = data;
    setErrRes(null);
    try {
      await request("post", "/auth/login", { username, password, remember });
      dispatch(performDoAuthenticate());
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <LoginFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <LoginForm />
    </LoginFormWrapper>
  );
};

export default LoginFormCtn;

// PropTypes
LoginFormCtn.propTypes = {
  onLoggingIn: PropTypes.func
};
LoginFormCtn.defaultProps = {
  onLoggingIn: undefined
};

// Styles
const LoginFormWrapper = styled(FormWrapper)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 2rem !important;
  }

  & > .submit {
    margin-top: 0.5rem !important;
  }
`;

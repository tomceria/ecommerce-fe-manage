import React, { useState } from "react";
import styled from "styled-components";

import clientInfo from "../../../configs/clientInfo.config";
import { colors } from "../../../styles/variables/colors.style";
import stylings from "../../../styles/stylings/stylings.style";
import LoginFormCtn from "../containers/LoginFormCtn";
import SysLogo from "../../shared/components/Branding/SysLogo";
import LoadScreen from "../../shared/components/UI/LoadScreen";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoggingIn = status => {
    setIsLoggingIn(status);
  };

  return (
    <LoginPageStyled>
      <LoadScreen
        className="loadScreen"
        in={isLoggingIn}
        background={colors.gray.light}
        mover={colors.gray.offwhite}
      />
      <div className="box">
        <div className="logoCtn">
          <SysLogo type="full" />
        </div>
        <p style={{ textAlign: "center", margin: 0, color: colors.gray.dark }}>
          {`${clientInfo.org}`}
        </p>
        <LoginFormCtn onLoggingIn={handleLoggingIn} />
      </div>
      <p
        style={{
          position: "fixed",
          textAlign: "center",
          color: colors.gray.dark,
          alignSelf: "flex-end",
          marginTop: "-1.5rem"
        }}
      >
        2020 Lưu Minh Hoàng
      </p>
    </LoginPageStyled>
  );
};

export default LoginPage;

// Styles
const LoginPageStyled = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  & > .loadScreen {
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: -1;
  }

  & > .box {
    width: 25rem;
    height: 100vh;
    min-height: 30rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: auto;
  }
  & > .box > .logoCtn {
    padding: 1rem;
    width: 100%;
  }

  @media (${stylings.mediaQuery.touch}) {
    align-items: initial;

    & > .box {
      height: 75vh;
    }
  }
`;

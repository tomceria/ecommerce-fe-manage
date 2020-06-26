import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SnackbarProvider as SBProvider } from "notistack";
import { Icon } from "@iconify/react";

import iconSuccess from "@iconify/icons-bx/bx-check-circle";
import iconError from "@iconify/icons-bx/bx-x-circle";
import iconWarning from "@iconify/icons-bx/bx-loader";
import iconInfo from "@iconify/icons-bx/bx-info-circle";

const SnackbarProvider = ({ children }) => {
  return (
    <SBProvider
      maxSnack={2}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      iconVariant={{
        success: <IconStyled icon={iconSuccess} />,
        error: <IconStyled icon={iconError} />,
        warning: <IconStyled icon={iconWarning} />,
        info: <IconStyled icon={iconInfo} />
      }}
    >
      {children}
    </SBProvider>
  );
};

export default SnackbarProvider;

// PropTypes
SnackbarProvider.propTypes = {
  children: PropTypes.element.isRequired
};

// Styles
const IconStyled = styled(Icon)`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.5rem;
`;

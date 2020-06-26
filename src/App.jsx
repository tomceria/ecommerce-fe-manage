import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import i18n from "./utils/i18n.util";
import SnackbarProvider from "./features/shared/containers/SnackbarProvider";

import theme from "./styles/stylings/theme.style";

import AuthContainer from "./features/Auth/hocs/AuthContainer";
import MainLayout from "./features/Layout/hocs/MainLayout";
import Main from "./features/shared/containers/Main";

import LoadScreen from "./features/shared/components/UI/LoadScreen";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter basename="/tp-admin">
              <Switch>
                {/* Testing Routes */}
                <Route path="/loadscreen" component={LoadScreen} />
                {/* Main Routes */}
                <Route path={["/", "/login"]}>
                  <AuthContainer>
                    <MainLayout>
                      <Main />
                    </MainLayout>
                  </AuthContainer>
                </Route>
              </Switch>
            </BrowserRouter>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;

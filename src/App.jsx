import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import SnackbarProvider from "./features/shared/containers/SnackbarProvider";

import theme from "./styles/stylings/theme.style";

import AuthContainer from "./features/Auth/hocs/AuthContainer";
import MainLayout from "./features/Layout/hocs/MainLayout";
import Main from "./features/shared/containers/Main";

import LoadScreen from "./features/shared/components/UI/LoadScreen";

function App() {
  return (
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
  );
}

export default App;

import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const { doAuthenticate, setFinishAuthenticate } = slice.actions;
export const performDoAuthenticate = createAction("AUTH_SAGA_DOAUTHENTICATE");
export const performLogout = createAction("AUTH_SAGA_LOGOUT");

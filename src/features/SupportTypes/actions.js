import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const { doGetSupportTypes, setLoadingSupportTypes, setSuccessSupportTypes } = slice.actions;

export const performGetSupportTypes = createAction(
  "SUPPORTTICKETSTATUSES_SAGA_GETSUPPORTTICKETSTATUSES",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);

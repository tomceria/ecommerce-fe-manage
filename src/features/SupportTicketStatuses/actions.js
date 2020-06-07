import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetSupportTicketStatuses,
  setLoadingSupportTicketStatuses,
  setSuccessSupportTicketStatuses
} = slice.actions;

export const performGetSupportTicketStatuses = createAction(
  "SUPPORTTICKETSTATUSES_SAGA_GETSUPPORTTICKETSTATUSES",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);

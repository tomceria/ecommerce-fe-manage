import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetSupportTickets,
  doGetSupportTicket,
  setLoadingSupportTickets,
  setLoadingSupportTicket,
  setSuccessSupportTickets,
  setSuccessSupportTicket
} = slice.actions;

export const performGetSupportTickets = createAction(
  "SUPPORTTICKETS_SAGA_GETSUPPORTTICKETS",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);
export const performGetSupportTicket = createAction(
  "SUPPORTTICKETS_SAGA_GETSUPPORTTICKET",
  function prepare(id) {
    return { payload: id };
  }
);

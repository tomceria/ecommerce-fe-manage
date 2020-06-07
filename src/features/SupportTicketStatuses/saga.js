import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetSupportTicketStatuses,
  setLoadingSupportTicketStatuses,
  setSuccessSupportTicketStatuses,
  performGetSupportTicketStatuses
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetSupportTicketStatuses(action) {
  let response = {};
  yield put(setLoadingSupportTicketStatuses(true));
  try {
    response = yield call(axios.get, `${baseURL}/support/statuses`, {
      params: { ...action.payload }
    });
    yield put(setSuccessSupportTicketStatuses(true));
  } catch (e) {
    yield put(setSuccessSupportTicketStatuses(false));
  }
  yield put(
    doGetSupportTicketStatuses({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingSupportTicketStatuses(false));
}

export default function* supportTicketStatusesSaga() {
  yield all([takeLatest(performGetSupportTicketStatuses, workGetSupportTicketStatuses)]);
}

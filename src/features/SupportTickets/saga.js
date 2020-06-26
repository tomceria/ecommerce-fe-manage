import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetSupportTickets,
  doGetSupportTicket,
  setLoadingSupportTickets,
  setLoadingSupportTicket,
  setSuccessSupportTickets,
  setSuccessSupportTicket,
  performGetSupportTickets,
  performGetSupportTicket
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetSupportTickets(action) {
  let response = {};
  yield put(setLoadingSupportTickets(true));
  try {
    response = yield call(axios.get, `${baseURL}/support`, {
      params: { ...action.payload }
    });
    yield put(setSuccessSupportTickets(true));
  } catch (e) {
    yield put(setSuccessSupportTickets(false));
  }
  yield put(
    doGetSupportTickets({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingSupportTickets(false));
}

function* workGetSupportTicket(action) {
  let response = {};
  yield put(setLoadingSupportTicket(true));
  try {
    response = yield call(axios.get, `${baseURL}/support/${action.payload}`);
    yield put(setSuccessSupportTicket(true));
  } catch (e) {
    yield put(setSuccessSupportTicket(false));
  }
  yield put(doGetSupportTicket(response.data.supportTicket));
  yield put(setLoadingSupportTicket(false));
}

export default function* supportTicketsSaga() {
  yield all([
    takeLatest(performGetSupportTickets, workGetSupportTickets),
    takeLatest(performGetSupportTicket, workGetSupportTicket)
  ]);
}

import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetAccountUsers,
  doGetAccountUser,
  setLoadingAccountUsers,
  setLoadingAccountUser,
  setSuccessAccountUsers,
  setSuccessAccountUser,
  performGetAccountUsers,
  performGetAccountUser
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetAccountUsers(action) {
  let response = {};
  yield put(setLoadingAccountUsers(true));
  try {
    response = yield call(axios.get, `${baseURL}/accountUser`, { params: { ...action.payload } });
    yield put(setSuccessAccountUsers(true));
  } catch (e) {
    yield put(setSuccessAccountUsers(false));
  }
  yield put(
    doGetAccountUsers({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingAccountUsers(false));
}

function* workGetAccountUser(action) {
  let response = {};
  yield put(setLoadingAccountUser(true));
  try {
    response = yield call(axios.get, `${baseURL}/accountUser/${action.payload}`);
    yield put(setSuccessAccountUser(true));
  } catch (e) {
    yield put(setSuccessAccountUser(false));
  }
  yield put(doGetAccountUser(response));
  yield put(setLoadingAccountUser(false));
}

export default function* productsSaga() {
  yield all([
    takeLatest(performGetAccountUsers, workGetAccountUsers),
    takeLatest(performGetAccountUser, workGetAccountUser)
  ]);
}

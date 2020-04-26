import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetAccountStaffs,
  doGetAccountStaff,
  doGetStaffRoles,
  setLoadingAccountStaffs,
  setLoadingAccountStaff,
  setLoadingStaffRoles,
  setSuccessAccountStaffs,
  setSuccessAccountStaff,
  setSuccessStaffRoles,
  performGetAccountStaffs,
  performGetAccountStaff,
  performGetStaffRoles
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetAccountStaffs(action) {
  let response = {};
  yield put(setLoadingAccountStaffs(true));
  try {
    response = yield call(axios.get, `${baseURL}/accountStaff`, { params: { ...action.payload } });
    yield put(setSuccessAccountStaffs(true));
  } catch (e) {
    yield put(setSuccessAccountStaffs(false));
  }
  yield put(
    doGetAccountStaffs({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingAccountStaffs(false));
}

function* workGetAccountStaff(action) {
  let response = {};
  yield put(setLoadingAccountStaff(true));
  try {
    response = yield call(axios.get, `${baseURL}/accountStaff/${action.payload}`);
    yield put(setSuccessAccountStaff(true));
  } catch (e) {
    yield put(setSuccessAccountStaff(false));
  }
  yield put(doGetAccountStaff(response));
  yield put(setLoadingAccountStaff(false));
}

function* workGetStaffRoles(action) {
  let response = {};
  yield put(setLoadingStaffRoles(true));
  try {
    response = yield call(axios.get, `${baseURL}/accountStaff/roles`);
    yield put(setSuccessStaffRoles(true));
  } catch (e) {
    yield put(setSuccessStaffRoles(false));
  }
  yield put(doGetStaffRoles({ response }));
  yield put(setLoadingStaffRoles(false));
}

export default function* productsSaga() {
  yield all([
    takeLatest(performGetAccountStaffs, workGetAccountStaffs),
    takeLatest(performGetAccountStaff, workGetAccountStaff),
    takeLatest(performGetStaffRoles, workGetStaffRoles)
  ]);
}

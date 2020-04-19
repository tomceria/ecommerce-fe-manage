import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

import {
  doAuthenticate,
  setFinishAuthenticate,
  performDoAuthenticate,
  performLogout
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workDoAuthenticate(action) {
  yield put(setFinishAuthenticate({ progress: false }));
  let repeat = false;
  do {
    repeat = false;
    try {
      const authRes = yield call(axios.get, `${baseURL}/auth/check-auth`);
      yield put(doAuthenticate({ authed: true, authRes }));
    } catch (e) {
      if (e.response.data.name === "AuthTokenExpiredError") {
        try {
          // 403 => accessToken expired => refresh
          yield call(axios.post, `${baseURL}/auth/refresh-token`);
          repeat = true;
          // continue;
        } catch (e2) {
          yield put(doAuthenticate({ authed: false }));
        }
      } else {
        yield put(doAuthenticate({ authed: false }));
      }
    }
  } while (repeat);
  yield put(setFinishAuthenticate({ progress: true }));
}

function* workLogout(action) {
  try {
    yield put(setFinishAuthenticate({ progress: false }));
    yield call(axios.post, `${baseURL}/auth/signout`);
    yield put(doAuthenticate({ authed: false }));
    yield put(setFinishAuthenticate({ progress: true }));
  } catch (e) {}
}

export default function* authSaga() {
  yield all([
    takeEvery(performDoAuthenticate, workDoAuthenticate),
    takeEvery(performLogout, workLogout)
  ]);
}

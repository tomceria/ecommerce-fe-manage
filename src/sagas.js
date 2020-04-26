import { all } from "redux-saga/effects";

import authSaga from "./features/Auth/saga";
import accountStaffSaga from "./features/AccountStaff/saga";
import accountUsersSaga from "./features/AccountUsers/saga";

// UNUSED
import productsSaga from "./features/Products/saga";
import brandsSaga from "./features/Brands/saga";
import categoriesSaga from "./features/Categories/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    accountStaffSaga(),
    accountUsersSaga(),
    productsSaga(),
    brandsSaga(),
    categoriesSaga()
  ]);
}

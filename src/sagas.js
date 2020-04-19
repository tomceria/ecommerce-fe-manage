import { all } from "redux-saga/effects";

import authSaga from "./features/Auth/saga";
import productsSaga from "./features/Products/saga";
import brandsSaga from "./features/Brands/saga";
import categoriesSaga from "./features/Categories/saga";

export default function* rootSaga() {
  yield all([authSaga(), productsSaga(), brandsSaga(), categoriesSaga()]);
}

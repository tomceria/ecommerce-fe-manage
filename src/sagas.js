import { all } from "redux-saga/effects";

import authSaga from "./features/Auth/saga";

import accountStaffSaga from "./features/AccountStaff/saga";
import accountUsersSaga from "./features/AccountUsers/saga";

import productsSaga from "./features/Products/saga";
import typesSaga from "./features/Types/saga";
import brandsSaga from "./features/Brands/saga";
import attributesSaga from "./features/Attributes/saga";
import inventorySaga from "./features/Inventory/saga";
import shopSaga from "./features/Shop/saga";

import ordersSaga from "./features/Orders/saga";
import orderStatusesSaga from "./features/OrderStatuses/saga";

import scalesSaga from "./features/Scales/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    accountStaffSaga(),
    accountUsersSaga(),
    //
    productsSaga(),
    typesSaga(),
    brandsSaga(),
    attributesSaga(),
    //
    inventorySaga(),
    //
    shopSaga(),
    //
    ordersSaga(),
    orderStatusesSaga(),
    //
    scalesSaga()
  ]);
}

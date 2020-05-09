import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetInventoryItems,
  doGetInventoryItem,
  setLoadingInventoryItems,
  setLoadingInventoryItem,
  setSuccessInventoryItems,
  setSuccessInventoryItem,
  performGetInventoryItems,
  performGetInventoryItem
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetInventoryItems(action) {
  let response = {};
  yield put(setLoadingInventoryItems(true));
  try {
    response = yield call(axios.get, `${baseURL}/inventories`, {
      params: { ...action.payload, withHidden: true }
    });
    yield put(setSuccessInventoryItems(true));
  } catch (e) {
    yield put(setSuccessInventoryItems(false));
  }
  yield put(
    doGetInventoryItems({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingInventoryItems(false));
}

function* workGetInventoryItem(action) {
  let response = {};
  yield put(setLoadingInventoryItem(true));
  try {
    response = yield call(axios.get, `${baseURL}/inventories/${action.payload}`);
    yield put(setSuccessInventoryItem(true));
  } catch (e) {
    yield put(setSuccessInventoryItem(false));
  }
  yield put(doGetInventoryItem(response.data.inventory));
  yield put(setLoadingInventoryItem(false));
}

export default function* inventoryItemsSaga() {
  yield all([
    takeLatest(performGetInventoryItems, workGetInventoryItems),
    takeLatest(performGetInventoryItem, workGetInventoryItem)
  ]);
}

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
import layoutReducer from "./features/Layout/reducers";
import authReducer from "./features/Auth/reducers";

import accountStaffReducer from "./features/AccountStaff/reducers";
import accountUsersReducer from "./features/AccountUsers/reducers";

import productsReducer from "./features/Products/reducers";
import typesReducer from "./features/Types/reducers";
import brandsReducer from "./features/Brands/reducers";
import attributesReducer from "./features/Attributes/reducers";

import inventoryReducer from "./features/Inventory/reducers";

import shopReducer from "./features/Shop/reducers";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    accountStaff: accountStaffReducer,
    accountUsers: accountUsersReducer,
    //
    products: productsReducer,
    types: typesReducer,
    brands: brandsReducer,
    attributes: attributesReducer,
    //
    inventory: inventoryReducer,
    shop: shopReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

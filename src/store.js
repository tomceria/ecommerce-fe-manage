import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
import layoutReducer from "./features/Layout/reducers";
import authReducer from "./features/Auth/reducers";
import productsReducer from "./features/Products/reducers";
import brandsReducer from "./features/Brands/reducers";
import categoriesReducer from "./features/Categories/reducers";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    products: productsReducer,
    brands: brandsReducer,
    categories: categoriesReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

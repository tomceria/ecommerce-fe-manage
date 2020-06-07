import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
import layoutReducer from "./features/Layout/reducers";
import authReducer from "./features/Auth/reducers";

import accountStaffReducer from "./features/AccountStaff/reducers";
import accountUsersReducer from "./features/AccountUsers/reducers";

import productsReducer from "./features/Products/reducers";
import scalesReducer from "./features/Scales/reducers";
import typesReducer from "./features/Types/reducers";
import makersReducer from "./features/Makers/reducers";
import brandsReducer from "./features/Brands/reducers";
import attributesReducer from "./features/Attributes/reducers";
import inventoryReducer from "./features/Inventory/reducers";
import shopReducer from "./features/Shop/reducers";
import ordersReducer from "./features/Orders/reducers";
import orderStatusesReducer from "./features/OrderStatuses/reducers";
import promotionsReducer from "./features/Promotions/reducers";
import supportTicketsReducer from "./features/SupportTickets/reducers";
import supportTypesReducer from "./features/SupportTypes/reducers";
import supportTicketStatusesReducer from "./features/SupportTicketStatuses/reducers";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    accountStaff: accountStaffReducer,
    accountUsers: accountUsersReducer,
    //
    products: productsReducer,
    scales: scalesReducer,
    types: typesReducer,
    makers: makersReducer,
    brands: brandsReducer,
    attributes: attributesReducer,
    inventory: inventoryReducer,
    shop: shopReducer,
    orders: ordersReducer,
    orderStatuses: orderStatusesReducer,
    promotions: promotionsReducer,
    supportTickets: supportTicketsReducer,
    supportTypes: supportTypesReducer,
    supportTicketStatuses: supportTicketStatusesReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

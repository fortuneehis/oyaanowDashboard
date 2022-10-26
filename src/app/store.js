import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "../features/bookings/bookingsSlice";
import userReducer from "../features/userSlice";
import companyReducer from "../features/companySlice";
import adminBusReducer from "../features/adminBusSlice";
import staffReducer from "../features/staffSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   bookings: bookingsReducer,
//   user: userReducer,
//   company: companyReducer,
//   adminBus: adminBusReducer,
//   staff: staffReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    user: userReducer,
    company: companyReducer,
    adminBus: adminBusReducer,
    staff: staffReducer,
  },
});

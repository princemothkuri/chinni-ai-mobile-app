import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appMainReducer from "./features/AppMain/appMainSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  appMain: appMainReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Single shared store instance
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor tied to the shared store instance
const persistor = persistStore(store);

export { store, persistor };
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

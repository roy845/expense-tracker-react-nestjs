import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import userPermissionsReducer from "../features/permissionsSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    userPermissions: userPermissionsReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

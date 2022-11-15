import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import desksReducer from "../features/desks/state/desksSlice";
import employeesReducer from "../features/employees/state/employeesSlice";

export const store = configureStore({
  reducer: {
    desks: desksReducer,
    employees: employeesReducer,
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

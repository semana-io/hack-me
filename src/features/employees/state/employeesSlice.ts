import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { initialDesksState } from "../../desks/state/desksSlice";

export interface Employee {
  id: string;
  name: string;
  email: string;
  deskPreferenceList: EmployeeDeskPreference[];
}

export interface EmployeeDeskPreference {
  id: string;
  index: number;
}

export interface EmployeesState {
  employees: Record<string, Employee>;
}

const initialState: EmployeesState = {
  employees: {
    "3297e9d2-6683-11ed-8a73-cf4939c13467": {
      id: "3297e9d2-6683-11ed-8a73-cf4939c13467",
      name: "john",
      email: "john@gmail.com",
      deskPreferenceList: Object.values(initialDesksState.desks)
        .slice(0, 2)
        .map(({ id }, index) => ({ id, index })),
    },
  },
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addOrEditEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees[action.payload.id] = action.payload;
      // todo: figure out method (like saga) to return error if user already exists for the sake of refreshment
    },

    removeEmployee: (state, action: PayloadAction<Employee>) => {
      delete state.employees[action.payload.id];
    },

    // increaseEmployeeDeskPreference: (
    //   state,
    //   action: PayloadAction<{
    //     employeeId: string;
    //     desk: EmployeeDeskPreference;
    //   }>
    // ) => {
    //   const { desk, employeeId } = action.payload;

    //   const newPreferences = movePreferenceIndex(
    //     state.employees[employeeId].deskPreferenceList,
    //     desk.id
    //   );
    //   // const newPreferences = state.employees[employeeId].deskPreferenceList.map(
    //   //   (listedDesk) => {
    //   //     const isAscendingDesk = listedDesk.id === desk.id;
    //   //     const isDetronedDesk = listedDesk.index === desk.index - 1;

    //   //     if (isAscendingDesk) {
    //   //       return {
    //   //         ...desk,
    //   //         index: desk.index > 0 ? desk.index - 1 : 0,
    //   //       };
    //   //     } else if (isDetronedDesk) {
    //   //       return { ...listedDesk, index: listedDesk.index + 1 };
    //   //     }
    //   //     return listedDesk;
    //   //   }
    //   // );
    //   state.employees[employeeId].deskPreferenceList = newPreferences || [];
    // },

    // removeDeskFromEmployeesPreferences: (
    //   state,
    //   action: PayloadAction<{
    //     employeeId: string;
    //     desk: EmployeeDeskPreference;
    //   }>
    // ) => {
    //   const { desk, employeeId } = action.payload;

    //   state.employees[employeeId].deskPreferenceList = state.employees[
    //     employeeId
    //   ].deskPreferenceList.filter((preference) => preference.id !== desk.id);
    // },

    saveEmployeePreferencesDraft: (
      state,
      action: PayloadAction<{
        employeeId: string;
        preferences: EmployeeDeskPreference[];
      }>
    ) => {
      const { employeeId, preferences } = action.payload;
      state.employees[employeeId].deskPreferenceList = preferences;
    },
  },
});

export const {
  addOrEditEmployee,
  removeEmployee,
  // increaseEmployeeDeskPreference,
  // removeDeskFromEmployeesPreferences,
  saveEmployeePreferencesDraft,
} = employeesSlice.actions;

export default employeesSlice.reducer;

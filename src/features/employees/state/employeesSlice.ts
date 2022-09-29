import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { initialDesksState } from "../../desks/state/desksSlice";
import { Employee } from "../components/EmployeesList";

export interface DesksState {
  employees: Employee[];
}

const initialState: DesksState = {
  employees: [
    {
      name: "john",
      email: "john@gmail.com",
      // todo: use references here instead of having duplicate state and sync modifications
      //       to desks in desksSlice here in users lists
      deskPreferenceList: [
        { ...initialDesksState.desks[0], index: 0 },
        { ...initialDesksState.desks[1], index: 1 },
        { ...initialDesksState.desks[2], index: 2 },
      ],
    },
  ],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },

    removeEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.filter(
        (employee) => employee.email !== action.payload.email
      );
    },

    editEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.map((employee) =>
        employee.email === action.payload.email ? action.payload : employee
      );
    },

    updateDeskPreferences: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.map((employee) =>
        employee.email === action.payload.email ? action.payload : employee
      );
    },
  },
});

export const { addEmployee, removeEmployee, editEmployee } =
  employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.employees;

export default employeesSlice.reducer;

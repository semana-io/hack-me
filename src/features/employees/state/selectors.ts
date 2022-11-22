import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Employee } from "./employeesSlice";

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesArray = createSelector(
  selectEmployees,
  (employees) => Object.values(employees)
);
export const selectEmployee = (state: RootState, employeeId: string) =>
  selectEmployees(state)[employeeId];

export const selectEmployeeDeskPreferences = createSelector(
  selectEmployee,
  (employee) => employee.deskPreferenceList.sort((a, b) => a.index - b.index)
);

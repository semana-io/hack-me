import { useState } from "react";
import { Desk } from "../../desks/components/DeskListItem";
import { EmployeeListItem } from "./EmployeeListItem";
import { EmployeeForm } from "./EmployeeForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addEmployee,
  editEmployee,
  removeEmployee,
  selectEmployees,
} from "../state/employeesSlice";

export interface EmployeeDesk extends Desk {
  index: number;
}

// todo: add id field
export interface Employee {
  name: string;
  email: string;
  deskPreferenceList: EmployeeDesk[];
}

export interface EmployeesListProps {}

export const EmployeesList = () => {
  const employees = useAppSelector(selectEmployees);
  const dispatch = useAppDispatch();

  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >();

  return (
    <div>
      <div>
        {employees.map((employee) => (
          <EmployeeListItem
            employee={employee}
            actionButtons={[
              { text: "edit", onClick: () => setSelectedEmployee(employee) },
              {
                text: "remove",
                onClick: () => dispatch(removeEmployee(employee)),
              },
            ]}
          />
        ))}
      </div>
      <div>------ FORM -------</div>
      <EmployeeForm
        formCallback={(employee) => {
          if (selectedEmployee) {
            dispatch(editEmployee(employee));
          } else {
            dispatch(addEmployee(employee));
          }
          // reset employee here after action to be able to create new one
          setSelectedEmployee(undefined);
        }}
        employee={selectedEmployee}
      />
    </div>
  );
};

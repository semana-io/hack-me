import { useState } from "react";
import { EmployeeListItem } from "./EmployeeListItem";
import { EmployeeForm } from "./EmployeeForm";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addOrEditEmployee,
  Employee,
  removeEmployee,
} from "../state/employeesSlice";
import { selectEmployees } from "../state/selectors";

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
            dispatch(addOrEditEmployee(employee));
          } else {
            dispatch(addOrEditEmployee(employee));
          }
          // reset employee here after action to be able to create new one
          setSelectedEmployee(undefined);
        }}
        employee={selectedEmployee}
      />
    </div>
  );
};

import { FC } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { ActionButton } from "../../desks/components/DeskListItem";
import { editEmployee, Employee } from "../state/employeesSlice";
import { EmployeeDeskList } from "./EmployeeDeskList";

export interface EmployeeListItemProps {
  employee: Employee;
  actionButtons: ActionButton[];
}

export const EmployeeListItem: FC<EmployeeListItemProps> = ({
  employee,
  actionButtons,
}) => {
  const dispatch = useAppDispatch();

  const { name, email } = employee;

  const showActionButtons = actionButtons && actionButtons.length > 0;

  return (
    <div style={styles.wrapperStyle}>
      <div>name: {name}</div>
      <div>email: {email}</div>
      <div>
        preffered desk:
        <EmployeeDeskList
          employee={employee}
          onChange={(changedEmployee) =>
            dispatch(editEmployee(changedEmployee))
          }
        />
      </div>
      {showActionButtons && (
        <div>
          {actionButtons?.map(({ text, onClick }) => (
            <button onClick={onClick}>{text}</button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapperStyle: {
    border: "1px solid hotpink",
  },
};

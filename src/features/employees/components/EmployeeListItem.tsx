import { FC } from "react";
import { ActionButton } from "../../desks/components/DeskListItem";
import { Employee } from "../state/employeesSlice";
import { EmployeeDeskList } from "./EmployeeDeskList";

export interface EmployeeListItemProps {
  employee: Employee;
  actionButtons: ActionButton[];
}

export const EmployeeListItem: FC<EmployeeListItemProps> = ({
  employee,
  actionButtons,
}) => {
  const { name, email, id, deskPreferenceList } = employee;

  const showActionButtons = actionButtons && actionButtons.length > 0;

  return (
    <div style={styles.wrapperStyle}>
      <div>name: {name}</div>
      <div>email: {email}</div>
      <div>
        preffered desk:
        <EmployeeDeskList employeeId={id} preferences={deskPreferenceList} />
      </div>
      {showActionButtons && (
        <div>
          {actionButtons?.map(({ text, onClick }) => (
            <button key={text} onClick={onClick}>
              {text}
            </button>
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

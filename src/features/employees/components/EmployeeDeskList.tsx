import { FC } from "react";
import { DeskListItem } from "../../desks/components/DeskListItem";
import { Employee, EmployeeDesk } from "./EmployeesList";

export interface EmployeeDeskListProps {
  onChange: (employee: Employee) => any;
  employee: Employee;
}

export const EmployeeDeskList: FC<EmployeeDeskListProps> = ({
  employee,
  onChange,
}) => {
  const desks = employee?.deskPreferenceList
    ? [...employee.deskPreferenceList]
    : [];

  const increaseDeskPreference = (desk: EmployeeDesk) => {
    const newOrderDesks = desks
      .map((listedDesk) => {
        const isAscendingDesk = listedDesk.id === desk.id;
        const isDetronedDesk = listedDesk.index === desk.index - 1;

        if (isAscendingDesk) {
          return {
            ...desk,
            index: desk.index > 0 ? desk.index - 1 : 0,
          };
        } else if (isDetronedDesk) {
          return { ...listedDesk, index: listedDesk.index + 1 };
        }
        return listedDesk;
      })
      .sort((a, b) => a.index - b.index);

    onChange({ ...employee, deskPreferenceList: newOrderDesks });
  };

  if (!employee) {
    return null;
  }

  return (
    <div>
      {desks
        .sort((a, b) => a.index - b.index)
        .map((desk) => (
          <DeskListItem
            {...desk}
            actionButtons={[
              {
                text: "up",
                onClick: () => increaseDeskPreference(desk),
              },
              {
                text: "remove",
                onClick: () =>
                  onChange({
                    ...employee,
                    deskPreferenceList: employee.deskPreferenceList.filter(
                      (listedDesk) => listedDesk.id !== desk.id
                    ),
                  }),
              },
            ]}
          />
        ))}
    </div>
  );
};

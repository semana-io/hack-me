import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { FormInput } from "../../common/components/FormInput";
import { selectDesks } from "../../desks/state/desksSlice";
import { DeskSelectInput } from "./DeskSelectInput";
import { EmployeeDeskList } from "./EmployeeDeskList";
import { Employee, EmployeeDesk } from "./EmployeesList";

// pretty much quick copy of the desk form but I'm in a hurry so I won't get fancy :P

export interface EmployeeFormProps {
  formCallback: (employee: Employee) => any;
  employee?: Employee;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  formCallback,
  employee,
}) => {
  const desks = useAppSelector(selectDesks);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [deskList, setDeskList] = useState<EmployeeDesk[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<EmployeeDesk>();

  useEffect(() => {
    setName(employee?.name || "");
    setEmail(employee?.email || "");
    setDeskList(employee?.deskPreferenceList || []);
    setSelectedDesk(employee?.deskPreferenceList[0]);
  }, [employee]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setDeskList([]);
  };

  const getNonListedDesks = () => {
    return desks.filter(
      (desk) => !deskList.find((listedDesk) => listedDesk.id === desk.id)
    );
  };

  return (
    <div>
      <FormInput label="name" value={name} onChange={setName} />
      <FormInput label="email" value={email} onChange={setEmail} />
      <EmployeeDeskList
        employee={{ name, email, deskPreferenceList: deskList }}
        onChange={(changedEmployee) =>
          setDeskList(changedEmployee.deskPreferenceList)
        }
      />

      <DeskSelectInput
        desks={getNonListedDesks()}
        value={selectedDesk || getNonListedDesks()[0]}
        onChange={(desk) => {
          setSelectedDesk({
            ...desk,
            index: deskList.length,
          });
        }}
      />

      <button
        onClick={() => {
          setDeskList([...deskList, selectedDesk!]);
        }}
      >
        add desk
      </button>

      <button
        onClick={() => {
          formCallback({ name, email, deskPreferenceList: deskList });
          resetForm();
        }}
      >
        Save Employee
      </button>
    </div>
  );
};

import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectDesks } from "../../desks/state/desksSlice";
import { Employee } from "../../employees/components/EmployeesList";
import { selectEmployees } from "../../employees/state/employeesSlice";

export const DeskAssigner = () => {
  const employees = useAppSelector(selectEmployees);
  const desks = useAppSelector(selectDesks);

  const [assigmentResults, setAssigmentResults] = useState<string[]>([]);
  const [unassignedEmployees, setUnassignedEmployees] = useState<Employee[]>(
    []
  );

  // quite primitive, sometimes it will pick lower position on the list for you because it just
  // goes through desks in order and not checking for more context
  const assignDesks = () => {
    let employeePool = employees.map((e) => e);
    const seated: Employee[] = [];
    let unassigned: Employee[] = [];
    const results: string[] = [];

    const findSeater = (deskId: string) => {
      const findEmployeeDeskIndex = (employee: Employee) =>
        employee.deskPreferenceList.find(
          (employeeDesk) => employeeDesk.id === deskId
        )?.index;

      const employeesWithThatDeskOnList = employeePool.filter((employee) =>
        employee.deskPreferenceList.find((desk) => desk.id === deskId)
      );

      const sortedByPreference = employeesWithThatDeskOnList.sort(
        (a, b) => findEmployeeDeskIndex(a)! - findEmployeeDeskIndex(b)!
      );

      const bestMatch = sortedByPreference[0];
      if (!bestMatch) {
        // nobody wants to sit there ;_;
        return;
      }

      const result = `${desks.find((desk) => desk.id === deskId)?.name} - ${
        bestMatch.name
      }`;
      results.push(result);
      seated.push(bestMatch);
      employeePool = employeePool.filter(
        (employee) => employee.email !== bestMatch.email
      );
    };

    desks.forEach((desk) => findSeater(desk.id));
    unassigned = employees.filter(
      (employee) => !seated.find(({ email }) => email === employee.email)
    );

    console.log("!!!!!");
    console.log(results);
    console.log("!!!!!");
    console.log(unassigned);
    console.log("!!!!!");

    setAssigmentResults(results);
    setUnassignedEmployees(unassigned);
  };

  return (
    <div>
      <button onClick={assignDesks}>Assign Desks</button>
      <div>-</div>
      <div>SEATED</div>
      <div>-</div>
      {assigmentResults.map((line) => (
        <div>{line}</div>
      ))}
      <div>-</div>
      <div>UNASSIGNED</div>
      <div>-</div>
      {unassignedEmployees.map(({ name }) => (
        <div>{name}</div>
      ))}
    </div>
  );
};

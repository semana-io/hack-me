import munkres from 'munkres-js';
import { Assignment } from '../models/assignment';
import { Desk } from '../models/desk';
import { Employee } from '../models/employee';

const performAssignment = (employees: Employee[], desks: Desk[]) : {
  assignments: Assignment[], unassignedEmployees: Employee[]
} => {
  const matrix: number[][] = [];
  employees.forEach(((employee) => {
    const preferences: {[x: number]: number} = {};
    employee.desks?.forEach((desk, index) => { preferences[desk] = -index - 100; });
    matrix.push(
      desks.map((desk) => (preferences[desk.id] !== undefined ? preferences[desk.id] : 0)),
    );
  }));

  const result = munkres(matrix);

  const assignments : Assignment[] = result.map(
    (assignment: number[], index: number) : Assignment => (
      {
        id: index,
        employeeFirstName: employees[assignment[0]].firstName,
        employeeLastName: employees[assignment[0]].lastName,
        deskName: desks[assignment[1]].name,
        deskNumber: desks[assignment[1]].number,
      }
    ),
  );

  const assignedEmployees = new Set<number>(
    result.map((assignment: number[]) => assignment[0]),
  );

  const unassignedEmployees = employees.filter(
    (employee, index) => !assignedEmployees.has(index),
  );
  return {
    assignments,
    unassignedEmployees,
  };
};

export default performAssignment;

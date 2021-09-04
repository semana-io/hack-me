import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';
import { EmployeeDesk } from '../models/EmployeeDesk';

import { assignDesksToEmployees, compareEmployeesDesksList } from './EmployeesDesksAssignation';

describe('EmployeesDesksAssignation', () => {

  const mockDesks: Desk[] = [];
  const desk1 = new Desk(0, 'desk1');
  const desk2 = new Desk(1, 'desk2');
  const desk3 = new Desk(2, 'desk3');
  const desk4 = new Desk(3, 'desk4');
  const desk5 = new Desk(4, 'desk5');
  mockDesks.push(desk1, desk2, desk3, desk4, desk5);
  const mockEmployees: Employee[] = [];
  const employee1 = new Employee('employee1', 'employee1@mail', [desk1, desk2, desk3]);
  const employee2 = new Employee('employee2', 'employee2@mail', []);
  const employee3 = new Employee('employee3', 'employee3@mail', [desk1, desk3]);
  const employee4 = new Employee('employee4', 'employee4@mail', [desk4, desk5]);
  const employee5 = new Employee('employee5', 'employee5@mail', [desk1, desk5]);
  const employee6 = new Employee('employee6', 'employee6@mail', [desk2]);
  const employee7 = new Employee('employee7', 'employee7@mail', [desk1, desk3, desk4]);
  
  describe('assignDesksToEmployees', () => {
    
    mockEmployees.push(employee1, employee2, employee3, employee4, employee5, employee6, employee7);
    const expectedResult: EmployeeDesk[] = [];
    expectedResult.push(
      new EmployeeDesk(employee1, desk1),
      new EmployeeDesk(employee3, desk3),
      new EmployeeDesk(employee4, desk4),
      new EmployeeDesk(employee5, desk5),
      new EmployeeDesk(employee6, desk2),
      new EmployeeDesk(employee7, undefined),
      new EmployeeDesk(employee2, undefined)
    );

    it('should return a list of EmployeeDesk with unique assignation', () => {
      const assignationResult = assignDesksToEmployees(mockDesks, mockEmployees);
      expect(assignationResult[0]).toBeInstanceOf(EmployeeDesk);
      expect(assignationResult.length).toStrictEqual(7);
      expect(assignationResult).toStrictEqual(expectedResult);
    });

    it('should return an empty list if employees is empty', () => {
      const assignationResult = assignDesksToEmployees(mockDesks, []);
      expect(assignationResult).toStrictEqual([]);
    });

    it('should return an empty list if desks is empty', () => {
      const assignationResult = assignDesksToEmployees([], mockEmployees);
      expect(assignationResult).toStrictEqual([]);
    });

    it('should return an empty list if desks and employees are empty', () => {
      const assignationResult = assignDesksToEmployees([], []);
      expect(assignationResult).toStrictEqual([]);
    });
  });

  describe('compareEmployeesDesksList', () => {
    const employee8 = new Employee('employee8', 'employee8@mail', []);

    it('should return 0 none of the employees has favorite desks', () => {
      const result = compareEmployeesDesksList(employee2, employee8);
      expect(result).toStrictEqual(0);
    });

    it('should return -1 when first employee has favorite desks', () => {
      const result = compareEmployeesDesksList(employee1, employee2);
      expect(result).toStrictEqual(-1);
    });

    it('should return 1 when second employee has favorite desks', () => {
      const result = compareEmployeesDesksList(employee2, employee1);
      expect(result).toStrictEqual(1);
    });

    it('should return 0 when both employees have favorite desks set', () => {
      const result = compareEmployeesDesksList(employee3, employee1);
      expect(result).toStrictEqual(0);
    });
  });
});
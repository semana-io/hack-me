import { Desk } from "../../desks/models/Desk";
import { Employee } from "./Employee";

export class EmployeeDesk {
  employee: Omit<Employee, 'favoriteDesks'>;
  desk: Desk | undefined;

  constructor(employee: Omit<Employee, 'favoriteDesks'>, desk: Desk | undefined) {
    this.employee = employee;
    this.desk = desk;
  }
}
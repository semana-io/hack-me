import { Item } from '../types';

export interface Assignment extends Item {
  id: number;
  employeeFirstName: string,
  employeeLastName: string,
  deskNumber: number;
  deskName: string;
}

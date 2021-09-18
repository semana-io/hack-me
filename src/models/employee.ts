import { Item } from '../types';

export interface Employee extends Item {
  id: number;
  firstName: string,
  lastName: string,
  email: string,
  desks: number[]
}

import { Desk } from "../../desks/models/Desk";

export class Employee {
  name: string;
  email: string;
  favoriteDesks: Desk[];

  constructor(name: string, email: string, favoriteDesks: Desk[]) {
    this.name = name;
    this.email = email;
    this.favoriteDesks = favoriteDesks;
  }
}

import React from 'react';

import { AppContext } from '../../context/Context';
import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';
import { EmployeeDesk } from '../models/EmployeeDesk';

// TODO add tests on the function
const compareEmployeesDesksList = ( a: Employee, b: Employee) => {
    if ( (!Array.isArray(a.favoriteDesks) || a.favoriteDesks.length === 0) && (Array.isArray(b.favoriteDesks) && b.favoriteDesks.length > 0)){
      return 1;
    }
    if ( (Array.isArray(a.favoriteDesks) && a.favoriteDesks.length > 0) && (!Array.isArray(b.favoriteDesks) || b.favoriteDesks.length === 0)){
      return -1;
    }
    return 0;
}

export const assignDesksToEmployees: any = (desks: Desk[], employees: Employee[], resultTmp: EmployeeDesk[] = []) => {
  if (Array.isArray(employees) && employees.length > 0) {
    employees.sort(compareEmployeesDesksList);
    let tmpDesk;
    const employeeTmp = employees[0];
    employees.splice(0, 1);
    if (Array.isArray(desks) && desks.length > 0) {
      const deskIdx = desks.findIndex( d => employeeTmp.favoriteDesks.some( desk => desk.id === d.id));

      if (deskIdx > -1) {
        tmpDesk = desks[deskIdx];
        desks.splice(deskIdx, 1);
      }
    }
    resultTmp.push(new EmployeeDesk(employeeTmp, tmpDesk));
    assignDesksToEmployees(desks, employees, resultTmp);
  }

  return resultTmp;
}

const EmployeesDeskAssignation: React.FC = () => {
	return ( 
  <div>
    <h2>Desks Assignation</h2>
    <AppContext.Consumer>{ 
      ({desks, employees}) => {
        return <button
            type="button"
            onClick={() => assignDesksToEmployees(desks, employees)}
          >
            Assign desks to employees
          </button>
        }
      }
    </AppContext.Consumer>
  </div>)
}
export default EmployeesDeskAssignation;
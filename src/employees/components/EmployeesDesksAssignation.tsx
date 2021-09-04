import React from 'react';
import { AppContext } from '../../context/Context';
import { Desk } from '../../desks/models/Desk';
import { Employee } from '../models/Employee';

const assignDesksToEmployees = (desks: Desk[], employees: Employee[]) => {

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
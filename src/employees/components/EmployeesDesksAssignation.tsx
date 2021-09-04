import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { Employee } from '../models/Employee';


const EmployeesDeskAssignation: React.FC = () => {
  const { desks, employees } = useContext(AppContext);
	return ( 
  <div>
    <h2>Desks Assignation</h2>
    <div>{ 
      employees.map( e => <div key={e.email}> 
          {e.name}
        </div>
        )
      }
    </div>
  </div>)
}
export default EmployeesDeskAssignation;
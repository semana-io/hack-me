import React, { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { Employee } from '../models/Employee';

const editEmployee = (employee) => {
  console.log('employee', employee);
}

const UsersList: React.FC = () => {
  const { employees } = useContext(AppContext);
  console.log(employees);
	return ( 
  <div>
    <h2>Employees list</h2>
    <div>{ 
      employees.map( e => <div key={e.email}> 
          {e.name}
          <button
            type="button"
            onClick={() => editEmployee(e)}
          >
            Edit (open modal TODO)
          </button>
        </div>
        )
      }
    </div>
  </div>)
}
export default UsersList;
import React from 'react';

import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeesList from './components/EmployeesList';

const EmployeesPage: React.FC = () => {

	return ( 
    <div>
      <h1>Employees page</h1>
      <AddEmployeeForm />
    </div>
  )
}
export default EmployeesPage;
import React from 'react';

import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeesDeskAssignation from './components/EmployeesDesksAssignation';

const EmployeesPage: React.FC = () => {
	return ( 
    <div>
      <h1>Employees page</h1>
      <AddEmployeeForm />
      {/* Employee list would have been here if I knew how to pass data between siblings */}
      <EmployeesDeskAssignation />
    </div>
  )
}
export default EmployeesPage;
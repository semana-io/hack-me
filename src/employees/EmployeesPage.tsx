import React from 'react';
import { AppContext } from '../core/context/Context';

import EmployeeForm from './components/EmployeeForm';
import EmployeesDeskAssignation from './components/EmployeesDesksAssignation';

const EmployeesPage: React.FC = () => {
	return ( 

    <AppContext.Consumer>{
        () => {
          return(
          <div className="employees-page">

            <h1>Employees page</h1>

            <div className="employees-container">
              <div className="employee-main">
                <EmployeeForm />
              </div>

              <EmployeesDeskAssignation />
  
            </div>

          </div>
          )
        }
      }
    </AppContext.Consumer>
  )
}
export default EmployeesPage;
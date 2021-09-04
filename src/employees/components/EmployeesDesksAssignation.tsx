import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let assignationData: EmployeeDesk[] = [];

	return ( 
  <div className="desk-assignation">
    <h2>Desks Assignation</h2>
    <AppContext.Consumer>{ 
      ({desks, employees}) => {
        return <Button
            className="assignation-button"
            type="button"
            onClick={() => {
              assignationData = assignDesksToEmployees(desks, employees);
              setShow(true);
            }}
          >
            Assign desks to employees
          </Button>
        }
      }
    </AppContext.Consumer>
    <Modal show={show &&Array.isArray(assignationData) && assignationData.length > 0 } onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Desk Assignation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{
        assignationData.map( (a: EmployeeDesk) => {
            if (Array.isArray(a.desk) && a.desk.length > 0) {
              return(<p>{ a.employee.name } get the { a.desk.name } desk</p>)
            } else {
              return(<p>{ a.employee.name } does not get a desk</p>)
            }
        })
      }</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  </div>)
}
export default EmployeesDeskAssignation;
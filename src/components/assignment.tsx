import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import Button from './generic/button';
import { Employee } from '../models/employee';
import { Desk } from '../models/desk';
import performAssignment from '../utils/assignment';
import { Assignment as AssignmentType } from '../models/assignment';
import Table from './generic/table';
import { FieldsWithLabels } from '../types';

const Assignment = () : JSX.Element => {
  const {
    isLoading: isDesksLoading, isError: isDesksError, data: desksData,
  } = useQuery('fetchDesks', () => axios.get<Desk[]>('http://localhost:3002/desks'));

  const {
    isLoading: isEmployeesLoading, isError: isEmployeesError, data: employeesData,
  } = useQuery('fetchEmployees', () => axios.get<Employee[]>('http://localhost:3002/employees'));

  const [assignments, setAssignments] = useState<AssignmentType[] | null>(null);
  const [unassignedEmployees, setUnassignedEmployees] = useState<Employee[] | null>(null);

  if (isDesksLoading || isEmployeesLoading) {
    return <div className="spinner-border" />;
  }

  if (isDesksError || isEmployeesError) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading the employees data
      </div>
    );
  }

  const employees = (employeesData as AxiosResponse<Employee[]>).data;
  const desks = (desksData as AxiosResponse<Desk[]>).data;

  const onClick = () => {
    const result = performAssignment(employees, desks);
    setAssignments(result.assignments);
    setUnassignedEmployees(result.unassignedEmployees);
  };

  const assignmentColumns : FieldsWithLabels<AssignmentType> = [
    {
      field: 'employeeFirstName',
      label: 'First Name',
    },
    {
      field: 'employeeLastName',
      label: 'Last Name',
    },
    {
      field: 'deskNumber',
      label: 'Desk Number',
    },
    {
      field: 'deskName',
      label: 'Desk Name',
    },
  ];

  const unassignedEmployeesColumns : FieldsWithLabels<Employee> = [
    {
      field: 'firstName',
      label: 'First Name',
    },
    {
      field: 'lastName',
      label: 'Last Name',
    },
    {
      field: 'email',
      label: 'Email',
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-center m-3">
        <Button
          label="Perform Assignment"
          onClick={onClick}
        />
      </div>
      {assignments && (
        <>
          <h3 className="mt-3">Assignments</h3>
          <Table
            items={assignments}
            columns={assignmentColumns}
          />
        </>
      )}
      {unassignedEmployees && (
      <>
        <h3 className="mt-3">Unassigned Employees:</h3>
        <Table
          items={unassignedEmployees}
          columns={unassignedEmployeesColumns}
        />
      </>
      )}
    </>
  );
};

export default Assignment;

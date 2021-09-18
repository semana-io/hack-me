import React from 'react';
import { Employee } from '../models/employee';
import Table from './generic/table';

const Employees = () : JSX.Element => {
  const employees : Employee[] = [{
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com',
  }];
  const columns : ({ field: keyof Employee, label: string })[] = [
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
    <Table
      items={employees}
      columns={columns}
    />
  );
};

export default Employees;

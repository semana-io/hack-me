import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Employee } from '../models/employee';
import Table from './generic/table';

const Employees = () : JSX.Element => {
  const {
    isLoading, isError, data,
  } = useQuery('fetchEmployees', () => axios.get<Employee[]>('http://localhost:3002/employees'));

  if (isLoading) {
    return <div className="spinner-border" />;
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading the employees data
      </div>
    );
  }

  const employees = (data as AxiosResponse<Employee[]>).data;

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

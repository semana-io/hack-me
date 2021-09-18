import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Employee } from '../models/employee';
import { FieldsWithLabels, FieldsWithLabelsAndTypes, Item } from '../models/types';
import Button from './generic/button';
import FormModal from './generic/form-modal';
import Table from './generic/table';

const Employees = () : JSX.Element => {
  type AddEmployee = Omit<Employee, 'id'>;

  const {
    isLoading, isError, data, refetch,
  } = useQuery('fetchEmployees', () => axios.get<Employee[]>('http://localhost:3002/employees'));

  const { mutateAsync: addAsync } = useMutation((employee: Item) => axios.post<void>('http://localhost:3002/employees', employee));

  const emptyEmployee: AddEmployee = { firstName: '', lastName: '', email: '' };

  const [employee, setEmployee] = useState<Item>(emptyEmployee);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const submitModal = async (newEmployee: Item) => {
    await addAsync(newEmployee);
    await refetch();
  };

  const columns : FieldsWithLabels<Employee> = [
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

  const formFields : FieldsWithLabelsAndTypes<Employee> = [
    {
      field: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      field: 'lastName',
      label: 'Last Name',
      type: 'text',
    },
    {
      field: 'email',
      label: 'Email',
      type: 'email',
    },
  ];

  return (
    <>
      <Table
        items={employees}
        columns={columns}
      />
      <Button
        onClick={() => setIsModalOpen(true)}
        label="Add user"
      />
      <FormModal
        label="Add user"
        submit={submitModal}
        formFields={formFields}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialItem={employee}
      />
    </>
  );
};

export default Employees;

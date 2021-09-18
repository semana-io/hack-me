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
  const { mutateAsync: updateAsync } = useMutation(({ id, employee }: {id: number, employee: Item}) => axios.put<void>(`http://localhost:3002/employees/${id}`, employee));
  const { mutateAsync: deleteAsync } = useMutation((id: number) => axios.delete<void>(`http://localhost:3002/employees/${id}`));

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
    if (newEmployee.id === undefined) {
      await addAsync(newEmployee);
    } else {
      await updateAsync({ id: newEmployee.id as number, employee: newEmployee });
    }
    await refetch();
  };

  const deleteEmployee = async (id: number) => {
    await deleteAsync(id);
    await refetch();
  };

  const openModifyModal = (item: Item) => {
    setEmployee(item);
    setIsModalOpen(true);
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
        openModifyModal={openModifyModal}
        deleteItem={deleteEmployee}
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

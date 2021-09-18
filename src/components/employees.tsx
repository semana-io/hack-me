import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Desk } from '../models/desk';
import { Employee } from '../models/employee';
import { FieldsWithLabels, FieldsWithLabelsAndTypes, Item } from '../types';
import Button from './generic/button';
import FormModal from './generic/form-modal';
import Table from './generic/table';

const Employees = () : JSX.Element => {
  type AddEmployee = Omit<Employee, 'id' | 'desks'>;

  const {
    isLoading, isError, data, refetch,
  } = useQuery('fetchEmployees', () => axios.get<Employee[]>('http://localhost:3002/employees'));

  const { mutateAsync: addAsync } = useMutation((employee: Item) => axios.post<void>('http://localhost:3002/employees', employee));
  const { mutateAsync: updateAsync } = useMutation(({ id, employee }: {id: number, employee: Item}) => axios.put<void>(`http://localhost:3002/employees/${id}`, employee));
  const { mutateAsync: deleteAsync } = useMutation((id: number) => axios.delete<void>(`http://localhost:3002/employees/${id}`));

  const {
    isLoading: isDesksLoading, isError: isDesksError, data: desksData,
  } = useQuery('fetchDesks', () => axios.get<Desk[]>('http://localhost:3002/desks'));

  const emptyEmployee: AddEmployee = { firstName: '', lastName: '', email: '' };

  const [employee, setEmployee] = useState<Item>(emptyEmployee);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || isDesksLoading) {
    return <div className="spinner-border" />;
  }

  if (isError || isDesksError) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading the employees data
      </div>
    );
  }

  const employees = (data as AxiosResponse<Employee[]>).data;
  const desks = (desksData as AxiosResponse<Desk[]>).data.map((desk) => ({ label: `${desk.name} - ${desk.number}`, value: desk.id }));

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
    {
      field: 'desks',
      label: 'Preferred Desks',
      type: 'select',
      options: desks,
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
        title="Employee"
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

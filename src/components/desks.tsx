import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Desk } from '../models/desk';
import Table from './generic/table';

const Desks = () : JSX.Element => {
  const {
    isLoading, isError, data,
  } = useQuery('fetchEmployees', () => axios.get<Desk[]>('http://localhost:3002/desks'));

  if (isLoading) {
    return <div className="spinner-border" />;
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading the desks data
      </div>
    );
  }

  const desks = (data as AxiosResponse<Desk[]>).data;

  const columns : ({ field: keyof Desk, label: string })[] = [
    {
      field: 'number',
      label: 'Number',
    },
    {
      field: 'name',
      label: 'Name',
    },
  ];

  return (
    <Table
      items={desks}
      columns={columns}
    />
  );
};

export default Desks;

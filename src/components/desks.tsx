import React from 'react';
import { Desk } from '../models/desk';
import Table from './generic/table';

const Desks = () : JSX.Element => {
  const desks : Desk[] = [{
    id: 1,
    number: 1234,
    name: 'Test',
  }];
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

import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Desk } from '../models/desk';
import { FieldsWithLabels, FieldsWithLabelsAndTypes, Item } from '../types';
import Button from './generic/button';
import FormModal from './generic/form-modal';
import Table from './generic/table';

const Desks = () : JSX.Element => {
  type AddDesk = Omit<Desk, 'id'>;

  const {
    isLoading, isError, data, refetch,
  } = useQuery('fetchEmployees', () => axios.get<Desk[]>('http://localhost:3002/desks'));

  const { mutateAsync: addAsync } = useMutation((desk: Item) => axios.post<void>('http://localhost:3002/desks', desk));
  const { mutateAsync: updateAsync } = useMutation(({ id, desk }: {id: number, desk: Item}) => axios.put<void>(`http://localhost:3002/desks/${id}`, desk));
  const { mutateAsync: deleteAsync } = useMutation((id: number) => axios.delete<void>(`http://localhost:3002/desks/${id}`));

  const emptyDesk: AddDesk = { number: 0, name: '' };

  const [desk, setDesk] = useState<Item>(emptyDesk);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const submitModal = async (newDesk: Item) => {
    if (newDesk.id === undefined) {
      if (desks.find((existingDesk) => existingDesk.number === newDesk.number)) {
        return;
      }
      await addAsync(newDesk);
    } else {
      await updateAsync({ id: newDesk.id as number, desk: newDesk });
    }
    await refetch();
  };

  const deleteDesk = async (id: number) => {
    await deleteAsync(id);
    await refetch();
  };

  const openModifyModal = (item: Item) => {
    setDesk(item);
    setIsModalOpen(true);
  };

  const columns : FieldsWithLabels<Desk> = [
    {
      field: 'number',
      label: 'Number',
    },
    {
      field: 'name',
      label: 'Name',
    },
  ];

  const formFields : FieldsWithLabelsAndTypes<Desk> = [
    {
      field: 'number',
      label: 'Number',
      type: 'number',
    },
    {
      field: 'name',
      label: 'Name',
      type: 'text',
    },
  ];

  return (
    <>
      <Table
        items={desks}
        columns={columns}
        openModifyModal={openModifyModal}
        deleteItem={deleteDesk}
      />
      <Button
        onClick={() => setIsModalOpen(true)}
        label="Add desk"
      />
      <FormModal
        title="Desk"
        submit={submitModal}
        formFields={formFields}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialItem={desk}
      />
    </>
  );
};

export default Desks;

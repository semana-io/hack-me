import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import { Item } from '../../types';

type TableProps<T extends {id: number}, K extends keyof T> = {
  items: Array<T>;
  columns: Array<{ field: K, label: string }>;
  openModifyModal?: (item: Item) => void;
  deleteItem?: (id: number) => Promise<void>;
};

const Table = <T extends {id: number}, K extends keyof T>
  ({
    items, columns, openModifyModal, deleteItem,
  } : TableProps<T, K>) : JSX.Element => (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => <th scope="col" key={`${column.field}`}>{column.label}</th>)}
          {openModifyModal && <th scope="col">Modify</th>}
          {deleteItem && <th scope="col">Delete</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={`${item.id}`}>
            {columns.map((column) => (<td key={`${item.id}-${column.field}`}>{item[column.field]}</td>))}
            {openModifyModal && <td><Button label="Modify" onClick={() => openModifyModal(item)} /></td>}
            {deleteItem && <td><Button label="Delete" onClick={() => deleteItem(item.id)} /></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );

Table.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModifyModal: PropTypes.func,
  deleteItem: PropTypes.func,
};

Table.defaultProps = {
  openModifyModal: undefined,
  deleteItem: undefined,
};

export default Table;

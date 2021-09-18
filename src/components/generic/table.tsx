import React from 'react';
import PropTypes from 'prop-types';

type TableProps<T extends {id: number}, K extends keyof T> = {
  items: Array<T>;
  columns: Array<{ field: K, label: string }>;
};

const Table = <T extends {id: number}, K extends keyof T>
  ({
    items, columns,
  } : TableProps<T, K>) : JSX.Element => (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => <th scope="col" key={`${column.field}`}>{column.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={`${item.id}`}>
            {columns.map((column) => (<td key={`${item.id}-${column.field}`}>{item[column.field]}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );

Table.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;

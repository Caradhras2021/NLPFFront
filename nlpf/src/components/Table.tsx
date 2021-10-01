import React, { FC } from 'react';
import './Table.css';

export type Acquisition = {
    date: string,
    value: string,
    address: string,
    city: string,
    zip: string,
    surface: string,
    rooms: string,
}

export type Column = {
    Header: string,
    accessor: string,
}

export interface TableProps{
  data: Acquisition[],
  columns: Column[]
}

/* eslint-disable */
export const Table: FC<TableProps> = ({ data, columns }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          { columns.map((column: any) => (
            <th>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody >
          { data.map((elt: Acquisition) => (
              <tr>
                  {columns.map((column: Column) => (
                  <td>
                    {elt[column.accessor as keyof Acquisition]}
                  </td>
                  ))}
              </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

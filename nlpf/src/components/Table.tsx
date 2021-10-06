import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Table.css';

export type Acquisition = {
    date: string,
    value: string,
    address: string,
    city: string,
    zip: string,
    surface: string,
    rooms: string,
    lat: number,
    lng: number,
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
          <th>Carte</th>
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
                  <td>
                    <Link className="nav-link" to={`/map/${elt.lat}/${elt.lng}` }>
                      <Button type="submit">
                        Voir
                      </Button>
                    </Link>
                  </td>
              </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

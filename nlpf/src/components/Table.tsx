import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalMap from './ModalMap';
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

export type Transaction = {
  id_mutation: string,
  date_mutation: string,
  valeur_fonciere: number | string,
  adresse_numero: string,
  adresse_nom_voie: string,
  code_postal: number | string,
  nom_commune: string,
  lot1_surface_carrez: number | string,
  type_local: string,
  nombre_pieces_principales: number | string,
  surface_terrain: number | string,
  longitude: number | string,
  latitude: number | string
}

export type Column = {
    Header: string,
    accessor: string,
}

export interface TableProps{
  data: Acquisition[] | undefined,
  columns: Column[]
}

/* eslint-disable */
export const Table: FC<TableProps> = ({ data, columns }: TableProps) => {

  if (!data) { return <h1>Loading</h1> }

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
                    {
                      elt[column.accessor as keyof Acquisition]
                    }
                  </td>
                  ))}
                  <td>
                    <ModalMap data={data} elt={elt} />
                  </td>
              </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;

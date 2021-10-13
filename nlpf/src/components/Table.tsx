import { FC, useState } from 'react';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
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
    houseMean?: number,
    apartMean?: number,
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
  latitude: number | string,
  houseMean?: number,
  apartMean?: number,
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
  const [isSort, setSort] = useState(false);
  const [isSortDate, setSortDate] = useState(false)

  const ascendingDate = (): void => {
    if (data !== undefined) {
      data.sort((a, b) => (new Date(b.date) > new Date(a.date) ? -1 : 1))
      setSortDate(!isSortDate)
    }
  }

  const descendingDate = (): void => {
    if (data !== undefined) {
      data.sort((a, b) => (new Date(b.date) < new Date(a.date) ? -1 : 1))
      setSortDate(!isSortDate)
    }
  }

  const ascendingSortValue = (): void => {
    if (data !== undefined) {
      data.sort((a, b) => (+a.value < +b.value ? -1 : 1))
      setSort(!isSort)
    }
      
  }

  const descendingSortValue = (): void => {
    if (data !== undefined) {
      data.sort((a, b) => (+a.value > +b.value ? -1 : 1));
      setSort(!isSort)
    }
  }    

  const dispTab = (): JSX.Element => {
    const render: Array<JSX.Element> = [];
    columns.map((column: any) => {
      if (column.Header === "Valeur foncière" && data !== undefined) {
        if (isSort) {
          render.push(<th onClick={() => ascendingSortValue()}>
          {column.Header + ' '}
          <BsFillArrowUpCircleFill style={{display: "inline"}} />
        </th>)
        } else {
          render.push(<th onClick={() => descendingSortValue()}>
          {column.Header + ' '}
          <BsFillArrowDownCircleFill style={{display: "inline"}} />
        </th>)
        }
      }
      else if (column.Header === "Date" && data !== undefined) {
        if (isSortDate) {
          render.push(<th onClick={() => ascendingDate()}>
            {column.Header + ' '}
            <BsFillArrowUpCircleFill style={{display: "inline"}} />
            </th>)
        }
        else {
          render.push(<th onClick={() => descendingDate()}>
            {column.Header + ' '}
            <BsFillArrowDownCircleFill style={{display: "inline"}} />
            </th>)
        }
      }
      else {
          render.push(<th>{column.Header}</th>)
      }
    })

    return (
      <thead>
        <tr>
          {render}
          <th>Carte</th>
        </tr>
      </thead>
    )
  }

  if (!data) { return <h1>Loading</h1> }

  return (
    <table>
      {dispTab()}
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

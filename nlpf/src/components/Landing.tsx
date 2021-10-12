import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs'
import { Column } from './Table';
import { Log } from './PostLogs';
import GetLogs from './GetLogs';
import './Table.css';

const columns: Column[] = [
  {
    Header: 'Prénom',
    accessor: "firstname"
  },
  {
    Header: 'Nom',
    accessor: "lastname"
  },
  {
    Header: 'Mail',
    accessor: "email_address"
  },
  {
    Header: 'Date',
    accessor: "time"
  }
]

function Landing() {

  const [admin, SetAdmin] = useState(false);
  const [data, SetData] = useState([] as Log[])

  const mock: Log = {
    firstname: "",
    lastname: "",
    email_address: "",
  }

  const checkAdmin = async (e: any) => {
    SetAdmin(!admin);
    const res = await GetLogs(mock);
    if (res) SetData(res);
  }

  const dispTab = (): JSX.Element => {
    return(
    <table>
    {
      columns.map((column: Column) => (
        <th>
            {column.Header}
        </th>
    ))
    }
    <tbody >
        { data.map((elt: Log) => (
            <tr>
                {columns.map((column: Column) => (
                <td>
                  {
                    elt[column.accessor as keyof Log]
                  }
                </td>
                ))}
            </tr>
        ))}
    </tbody>
  </table>
  )}

  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-3"><br /></div>
          <div className="col-lg-6">
            <h1 className="font-weight-light">Caradhras</h1>
            <br />
            <p>
              Bienvenue sur l&apos;outil d&apos;évaluation de bien créé par
              l&apos;entreprise Caradhras.
              <br />
              Elle vous permettra d&apos;avoir une estimation précise
              en fonction de nombreux critères.
              <br />
              Explorez des biens similaires sur notre carte intégrée, le tout gratuitement.
            </p>
            <br />
            <Link className="nav-link" to="/formsearch">
              <Button type="submit">
                Evaluez votre bien !
              </Button>
            </Link>
            <br />
            <Button
              style={{ position: "absolute", bottom: "30px", right: "30px" }}
              onClick={checkAdmin}>
              <BsFillGearFill />
            </Button>
            <br />
            { admin && dispTab()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

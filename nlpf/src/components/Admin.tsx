import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsFillGearFill } from 'react-icons/bs'
import { Column } from './Table';
import { Log } from './PostLogs';
import GetLogs from './GetLogs';
import './Table.css';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

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

function Admin() {

  const [admin, SetAdmin] = useState(false);
  const [data, SetData] = useState([] as Log[])

  const mock: Log = {
    firstname: "",
    lastname: "",
    email_address: "",
  }

  const checkAdmin = async () => {
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

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConnect = async () => {
    if (pwd == username) {
        SetAdmin(true);
        setShow(false);
        setError(false);
        await checkAdmin();
        return
    }
    setError(true);  
    SetAdmin(false);
  }

  const logDisp = () => {
    if (admin) {
        return <div></div>
    }
    return (
        <div>
        <p>Connectez-vous en tant qu'administrateur pour accéder au
        contenu de cette page.
        </p>   
        <Button variant="primary" onClick={handleShow}>
            Se connecter &nbsp;
            <BsFillGearFill />
        </Button>
        </div>
    )
  }

  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-3"><br /></div>
          <div className="col-lg-6">
            {logDisp()}

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Se connecter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form noValidate>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="username">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="mail">
                            <Form.Label>Mot de passe</Form.Label>
                            <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={pwd}
                                onChange={(event) => setPwd(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                      </Row>
                    </Form>
                    <br />
                    { error && <p style={{ color: "red" }}> Votre mot de passe n'est pas valide !</p>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleConnect}>
                    Valider
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
            <br />
            { admin && dispTab()}
          </div>
        </div>
      </div>
  );
}

export default Admin;

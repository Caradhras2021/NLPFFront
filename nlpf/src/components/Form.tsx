import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, InputGroup, Row } from 'react-bootstrap';
import { Table, Column } from './Table';
import data from './Data';

const columns: Column[] = [
  {
    Header: 'Date',
    accessor: 'date',
  }, {
    Header: 'Valeur foncière',
    accessor: 'value',
  }, {
    Header: 'Adresse du bien',
    accessor: 'address',
  }, {
    Header: 'Ville',
    accessor: 'city',
  }, {
    Header: 'Code postal',
    accessor: 'zip',
  }, {
    Header: 'Surface',
    accessor: 'surface',
  }, {
    Header: 'Pièces principales',
    accessor: 'rooms',
  },
];

export const FormSearch = (): JSX.Element => {
  /* eslint-disable */
  const render: JSX.Element = (
    <div className="Search">
      <br /><br />
        <Form noValidate>
        <h3>1 - Laissez vos coordonnées</h3><br/>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Prénom"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nom"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Adresse mail</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="adresse@mail.com"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <br/><h3>2 - Remplissez les informations concernant votre bien</h3><br/>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Adresse de votre bien</Form.Label>
            <Form.Control type="text" placeholder="Adresse" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir une adresse valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Département</Form.Label>
            <Form.Control type="text" placeholder="Département" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un département valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control type="text" placeholder="Code postal" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un code postal valide.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Surface Carrez</Form.Label>
            <Form.Control type="text" placeholder="m²" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir une surface valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Nombre de pièces</Form.Label>
            <Form.Control type="text" placeholder="Nb pièces" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un nombre de pièces valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Surface jardin</Form.Label>
            <Form.Control type="text" placeholder="m²" required />
            <Form.Control.Feedback type="invalid">
              Merci de remplir une surface de jardin valide.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Accepter les conditions d'utilisation"
            feedback="Vous devez acceptez avant de lancer votre évaluation."
            feedbackType="invalid"
          />
        </Form.Group>
        <br />
        <Button type="submit">Lancer votre évaluation</Button>
      </Form>
      <br/><h3>3 - Découvrez notre estimation</h3><br/>
      <Table
        columns={columns}
        data={data}
      />
      <br/><h3>4 - Parcourez les biens similaires</h3><br/>
    </div>);

  return render;
};

export default FormSearch;

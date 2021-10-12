import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, InputGroup, Row, Spinner } from 'react-bootstrap';
import { Table, Column, Transaction, Acquisition } from './Table';
import GetAcquisition from './Data';
import { useEffect, useState } from 'react';

//Column object to create dynamic table
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

//Void search by default
export const basicSearch: Transaction = {
  id_mutation: "",
  date_mutation: "",
  valeur_fonciere: "",
  adresse_numero: "",
  adresse_nom_voie: "",
  code_postal: 78820,
  nom_commune: "",
  lot1_surface_carrez: "",
  type_local: "Appartement",
  nombre_pieces_principales: "",
  surface_terrain: "",
  longitude: "",
  latitude: ""
}

//Helper Function to sleep during certain amount of time
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export const FormSearch = (): JSX.Element => {
  //Global component variables
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //Form component variables
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [zip, setZip] = useState("" as string | number);
  const [surface, setSurface] = useState("" as string | number);
  const [rooms, setRooms] = useState("" as string | number);
  const [req, SetReq] = useState(basicSearch);
  const [cgu, SetCgu] = useState(false);
  //Data fetched from Data component
  const [data, setData] = useState([] as Acquisition[] | undefined);
  const [pricing, setPricing] = useState(0);

  const averagePrice = (dataArray: Acquisition[]) => {
    if (dataArray.length === 0) setPricing(0)
    let sum: number = 0
    dataArray.forEach(elt => {
      sum += +elt.value
    })
    setPricing(Math.round(sum / dataArray.length))
  }

 const getData = async () => {
  const res = await GetAcquisition(req , page, 10 );
  setData(res);
  if (res !== undefined) averagePrice(res);
 }

  useEffect(() => {
    getData();
  }, [req, page]);

  const prevPage = () => {
    if (page > 1)
      setPage(page - 1);
  }
  const nextPage = () => {
    setPage(page + 1);
  }

  const onFormSubmit = async () => {

    //Check mandatory variables
    if (name === "" || lastname === "" || mail === "") { 
      alert("Veuillez remplir vos informations personnelles avant de continuer");
      return
    }
    if (!cgu) {
      alert("Veuillez acceptez les CGU avant de valider votre requête")
      return
    }

    //Check variables content

    setSurface(surface == 0 || surface == NaN ? "" : parseFloat(surface.toString()));
    setZip(zip == 0 || zip == NaN ? "" : parseFloat(zip.toString()));
    setRooms(rooms == 0  || rooms == NaN ? "" : parseFloat(rooms.toString()));
    

    if (zip === "") { alert("Le code postal est obligatoire"); return }
    
    //Creation of request from form
    const req: Transaction = {
      id_mutation: "",
      date_mutation: "",
      valeur_fonciere: "",
      adresse_numero: "",
      adresse_nom_voie: "",
      code_postal: zip,
      nom_commune: "",
      lot1_surface_carrez: surface,
      type_local: "Appartement",
      nombre_pieces_principales: rooms,
      surface_terrain: "",
      longitude: "",
      latitude: "",
    }
    
    //Loading and display of result
    const div = document.getElementById("res");
    if (div) div.style.display = "none";
    setLoading(true);
    SetReq(req);
    await sleep(3500);
    setLoading(false);
    if (div) div.style.display = "inline-block";
    const res = document.getElementById("result");
    if (res) res.scrollIntoView();
  }

  /* eslint-disable */
  const render: JSX.Element = (
    <div className="Search">
      <br /><br />
        <Form noValidate>
        <h3>1 - Laissez vos coordonnées</h3><br/>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="name">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Prénom"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nom"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="mail">
            <Form.Label>Adresse mail</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="adresse@mail.com"
                aria-describedby="inputGroupPrepend"
                required
                value={mail}
                onChange={(event) => setMail(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <br/><h3>2 - Remplissez les informations concernant votre bien</h3><br/>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="zip">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control type="number" placeholder="Code postal"
              value={zip}
              onChange={(event) => setZip(parseFloat(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un code postal valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="surface">
            <Form.Label>Surface Carrez</Form.Label>
            <Form.Control type="number" placeholder="m²" 
              value={surface}
              onChange={(event) => setSurface(parseFloat(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir une surface valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="rooms">
            <Form.Label>Nombre de pièces</Form.Label>
            <Form.Control type="number" placeholder="Nb pièces"
              value={rooms}
              onChange={(event) => setRooms(parseFloat(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un nombre de pièces valide.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Accepter les conditions d'utilisation"
            feedback="Vous devez acceptez avant de lancer votre évaluation."
            feedbackType="invalid"
            onClick={() => SetCgu(!cgu)}
          />
        </Form.Group>
        <br />
        <Button onClick={() => onFormSubmit()} style={{margin: "20px"}}>
        Lancer votre évaluation
        </Button>
        { loading && <Spinner animation="grow" variant="primary" /> }
        <br /><br />
      </Form>
      <div id="res" style={{display: "none"}}>
        <br/><h3 id="result">3 - Découvrez nos résultats</h3><br/>
        <h4>Prix moyen selon vos critères : {pricing == NaN ? pricing: 0}€</h4>
        <br/><h3>4 - Parcourez les biens similaires</h3><br/>
        <Table columns={columns} data={data} />
        <br />
        <Button variant="primary" onClick={prevPage} style={{margin: "20px"}}>
          Précédent
        </Button>
        <Button variant="primary" onClick={nextPage}>
          Suivant
        </Button>
        <br />
      </div>
    </div>);

  return render;
};

export default FormSearch;

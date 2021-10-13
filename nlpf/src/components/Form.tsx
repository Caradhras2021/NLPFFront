import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, InputGroup, Row, Spinner } from 'react-bootstrap';
import { Table, Column, Transaction, Acquisition } from './Table';
import GetAcquisition from './Data';
import { useEffect, useState } from 'react';
import Conditions from './Conditions';
import postLogs, { Log } from './PostLogs';
import './Form.css';

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
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const [zip, setZip] = useState("" as string | number);
  const [surface, setSurface] = useState("" as string | number);
  const [rooms, setRooms] = useState("" as string | number);
  const [req, SetReq] = useState(basicSearch);
  const [cgu, SetCgu] = useState(false);
  const [house, SetHouse] = useState(false);
  const [apartment, SetApartment] = useState(false);
  //Data fetched from Data component
  const [data, setData] = useState([] as Acquisition[] | undefined);
  const [pricing, setPricing] = useState(0);
  const [mean, setMean] = useState(0);

  const averagePrice = (dataArray: Acquisition[]) => {
    if (!data || dataArray.length === 0) {
      setPricing(0)
      return
    }
    let sum: number = 0
    dataArray.forEach(elt => {
      sum += +elt.value
    })
    setPricing(Math.round(sum / dataArray.length));
    const elt = data[0];
    if (elt) {
      const houseMean = elt.houseMean ? elt.houseMean : 0
      const apartMean = elt.apartMean ? elt.apartMean : 0
      const mean = Math.max(houseMean, apartMean);
      setMean(Math.round(mean));
    }
  }

 const getData = async () => {
   if (isNaN(+req.lot1_surface_carrez)) {
    req.lot1_surface_carrez = ""
   }
   if (isNaN(+req.nombre_pieces_principales)) {
     req.nombre_pieces_principales = ""
    }
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
    if (!house && !apartment) {
      alert("Veuillez sélectionner au moins un type de bien : Maison / Appartement")
      return
    }
    if (!cgu) {
      alert("Veuillez acceptez les CGU avant de valider votre requête")
      return
    }

    //Check variables content

    setSurface(surface === 0 || surface === NaN ? "" : parseFloat(surface.toString()));
    setZip(zip === 0 || zip === NaN ? "" : parseFloat(zip.toString()));
    setRooms(rooms === 0  || rooms === NaN ? "" : parseFloat(rooms.toString()));
    const type = house ? apartment ? "" : "Appartement" : "Maison";

    if (zip === "") { alert("Le code postal est obligatoire"); return }
    
    //Creation of request from form
    const req: Transaction = {
      id_mutation: "",
      date_mutation: "",
      valeur_fonciere: "",
      adresse_numero: "",
      adresse_nom_voie: address.toUpperCase(),
      code_postal: zip,
      nom_commune: "",
      lot1_surface_carrez: surface,
      type_local: type,
      nombre_pieces_principales: rooms,
      surface_terrain: "",
      longitude: "",
      latitude: "",
    }

    const log: Log = {
      firstname: name,
      lastname: lastname,
      email_address: mail
    }
    
    //Loading and display of result
    const div = document.getElementById("res");
    if (div) div.style.display = "none";
    setLoading(true);
    SetReq(req);
    postLogs(log);
    await sleep(5000);
    setLoading(false)
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
          <Form.Group as={Col} md="2" controlId="surface">
            <Form.Label>Surface Carrez</Form.Label>
            <Form.Control type="number" placeholder="m²" 
              value={surface}
              onChange={(event) => setSurface(parseFloat(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir une surface valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="rooms">
            <Form.Label>Nombre de pièces</Form.Label>
            <Form.Control type="number" placeholder="Nb pièces"
              value={rooms}
              onChange={(event) => setRooms(parseFloat(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un nombre de pièces valide.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="rooms">
            <Form.Label>Rue</Form.Label>
            <Form.Control type="text" placeholder="rue"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Merci de remplir un nombre de pièces valide.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Appartement"
            feedbackType="invalid"
            onClick={() => SetHouse(!house)}
          />
          <Form.Check
            required
            label="Maison"
            feedbackType="invalid"
            onClick={() => SetApartment(!apartment)}
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Accepter les conditions générales d'utilisation"
            feedback="Vous devez acceptez avant de lancer votre évaluation."
            feedbackType="invalid"
            onClick={() => SetCgu(!cgu)}
          />
          <Conditions />
        </Form.Group>
        <Button onClick={() => onFormSubmit()} style={{margin: "20px"}}>
        Lancer votre évaluation
        </Button>
        { loading && <Spinner animation="grow" variant="primary" /> }
        <br /><br />
      </Form>
      <div id="res" style={{display: "none"}}>
        <br/><h3 id="result">3 - Découvrez nos résultats</h3><br/>
        <div>
        <h4>Prix moyen des biens similaires : <span>{pricing}€</span></h4>
        <h4>Prix moyen au mètre carré : <span>{mean}€</span></h4>
        {!isNaN(+surface) && <h4>Estimation du prix de votre bien : <span >{mean * parseFloat(surface.toString())}€</span>
          </h4>}
        </div>
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

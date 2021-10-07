import { Acquisition, Transaction } from './Table';
import axios from 'axios';

const data: Acquisition[] = [
  {
    date: '19 janvier 2020',
    value: '450 000,00€',
    address: '17 avenue de Paris',
    city: 'Villejuif',
    zip: '94800',
    surface: '120m²',
    rooms: '5',
    lat: 51.506,
    lng: -0.184,
  },
  {
    date: '21 janvier 2020',
    value: '250 000,00€',
    address: '24 avenue du Général de Gaulle',
    city: 'Saint Léonard de Noblat',
    zip: '87200',
    surface: '200m²',
    rooms: '7',
    lat: 51.508,
    lng: -0.175,
  },
];

const test: Transaction = {
    id_mutation: "",
    date_mutation: "",
    valeur_fonciere: "",
    adresse_numero: "",
    adresse_nom_voie: "",
    code_postal: 44800,
    nom_commune: "",
    lot1_surface_carrez: "",
    type_local: "Appartement",
    nombre_pieces_principales: 4,
    surface_terrain: "",
    longitude: "",
    latitude: ""
}

export const getTransaction = async (data: Transaction, page: number, pageSize: number) => {
    try {
      const resp = await axios.post(`http://127.0.0.1:5000/getTransaction/${page}/${pageSize}`, {
        data,
        headers: {
          'Content-Type': 'CORS_HEADERS'
        }
      })
      console.log(resp)
      return resp

    } catch(e) {
      console.error(e)
    }
}

const tetest3 = getTransaction(test, 1, 10)

console.log(tetest3)

export default data;

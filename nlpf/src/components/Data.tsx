import { Acquisition, Transaction } from './Table';
import axios from 'axios';
import { useEffect, useState } from 'react';

/* const data: Acquisition[] = [
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

export const test: Transaction = {
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
}*/

const getTransaction = async (data: Transaction, page: number, pageSize: number) => {
    try {
      const resp = await axios.post(`http://127.0.0.1:5000/getTransaction/${page}/${pageSize}`, {
        data,
        headers: {
          'Content-Type': 'CORS_HEADERS'
        }
      })
      return resp;

    } catch(e) {
      console.error(e)
    }
}

const getTransactionWrapped = async (req: Transaction, page: number, pageSize: number) => {
  const res  = await getTransaction(req, page, pageSize);
  if(res) {
    const result: Acquisition[] = [];
    console.log(res.data, typeof res.data)
    const data = res.data as unknown as Transaction[];
    data.forEach(elt => {
      result.push({
        date: elt.date_mutation,
        value: elt.valeur_fonciere.toString(),
        address: elt.adresse_nom_voie,
        city: elt.nom_commune,
        zip: elt.code_postal.toString(),
        surface: elt.lot1_surface_carrez.toString(),
        rooms: elt.nombre_pieces_principales.toString(),
        lat: Number(elt.latitude.toString()),
        lng: Number(elt.longitude.toString()),
      })
    })
    return result
  }
}

const GetAcquisition = (dataset: Transaction, page: number, pageSize: number) => {
  const [data, setData] = useState<Acquisition[] | undefined>([]);

  const getData = async () => {
      const data = await getTransactionWrapped(dataset, page, pageSize);
      setData(data);
  }

  useEffect(() => {
    getData()
  }, [])

  return data;
}

export default GetAcquisition;

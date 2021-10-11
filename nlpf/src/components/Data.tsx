import { Acquisition, Transaction } from './Table';
import axios from 'axios';

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


const GetAcquisition = async (dataset: Transaction, page: number, pageSize: number) => {

  const res  = await getTransaction(dataset, page, pageSize);
  if(res) {
    const result: Acquisition[] = [];
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

export default GetAcquisition;

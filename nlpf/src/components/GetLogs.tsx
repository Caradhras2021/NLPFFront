import axios from 'axios';
import { Log } from './PostLogs';

const getLogs = async (log: Log) => {
    try {
      const resp = await axios.get(`http://127.0.0.1:5000/getLogs`, {
        data: log,
        headers: {
          'Content-Type': 'CORS_HEADERS'
        }
      })
      return resp;

    } catch(e) {
      console.error(e)
    }
}

const GetLogs = async (log: Log) => {

    const res  = await getLogs(log);
    const result: Log[] = [];
    if(res) {
      const data = res.data as unknown as Log[];
      data.forEach(elt => {
        result.push({
          email_address: elt.email_address,
          firstname: elt.lastname,
          lastname: elt.firstname,
          time: elt.time,
        })
      })
      return result
    }
}

export default GetLogs;

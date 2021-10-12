import axios from 'axios';

export type Log = {
    time?: string,
    firstname: string;
    lastname: string;
    email_address: string;
  }

const postLogs = async (log: Log) => {
    try {
      const resp = await axios.post(`http://127.0.0.1:5000/postLogs`, {
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

export default postLogs;

import axios from 'axios'
const http = 'https://ya-praktikum.tech/api/v2'

export default axios.create({
  baseURL: http,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
<<<<<<< HEAD
  withCredentials: true
});
 
=======
  withCredentials: true,
})
>>>>>>> main

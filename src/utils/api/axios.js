import axios from "axios";

const instance = axios.create({
  // baseURL:'http://localhost:3000/api',
  baseURL:'https://api-barbada.vercel.app/api',
  withCredentials: true
})

export default instance
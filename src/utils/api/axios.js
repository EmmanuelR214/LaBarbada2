import axios from "axios"

export const apiUser = axios.create({
  // baseURL:'api.labarbada.store/api',
  //baseURL:'http://localhost:3000/api',
  baseURL:'https://api-barbada.vercel.app/api',
  withCredentials: true
})

export const apiSaurce = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})
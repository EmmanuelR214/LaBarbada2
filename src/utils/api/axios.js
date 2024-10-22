import axios from "axios"

<<<<<<< HEAD
export const apiUser = axios.create({
  baseURL: "http://localhost:3000/api",
=======
const instance = axios.create({
  // baseURL:'api.labarbada.store/api',
  //baseURL:'http://localhost:3000/api',
  baseURL:'https://api-barbada.vercel.app/api',
>>>>>>> 6b88c959a0c3ab7f2e6437e130581cac5fa36c9f
  withCredentials: true
})

export const apiSaurce = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})
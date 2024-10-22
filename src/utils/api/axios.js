import axios from "axios"

export const apiUser = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const apiSaurce = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})
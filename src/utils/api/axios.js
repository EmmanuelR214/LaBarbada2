import axios from "axios";

export const apiUser = axios.create({
  baseURL: "https://api-barbadav1.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const apiStore = axios.create({
  baseURL: 'https://api-barbada-saurce.vercel.app/api',
  // baseURL: "http://localhost:3001/api",
  withCredentials: true
})
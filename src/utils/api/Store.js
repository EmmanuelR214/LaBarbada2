import axios from "./axios.js";

export const getMenuRequest = () => axios.get('/menu')

export const getCategoriaRequest = cat => axios.post('/categoria', cat)

export const getPlatilloRequest = plat => axios.post('/platillo', plat)
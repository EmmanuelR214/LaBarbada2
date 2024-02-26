import axios from "./axios";

export const registerRoute = user => axios.post(`/register`, user)

export const loginRoute = user => axios.post(`/login`, user)

export const CambiarPassRoute = pass => axios.post(`/compareUs`, pass)

export const loginFGRoute = user => axios.post('/registerFG', user)

export const logoutRoute = () => axios.post('/logout')

export const blockRoute = id => axios.post('/block', id)

export const verifTokenRequet = () => axios.get('/verify')
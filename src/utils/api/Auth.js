import {apiUser} from "./axios.js";
//todo: get
export const verifTokenRequet = () => apiUser.get('/verify')

export const alertRoute = () => apiUser.get('/alertloging')

export const DireccionRoute = idUser => apiUser.get(`/direcciones/${idUser}`)

//todo: post
export const searchNumberPhoneRoute = tel =>apiUser.post('/searchPhone',tel)

export const registerRoute = user => apiUser.post(`/register`, user)

export const loginRoute = user => apiUser.post(`/login`, user)

export const loginFacegooRoute = user => apiUser.post('/facegoo',user)

export const sendCodeRoute = email => apiUser.post('/sendCodeEmail', email)

export const recoverPassRoute = user => apiUser.post('/recoverPass', user)

export const InsertarDireccionRoute = direc => apiUser.post('/insertarDireccion', direc)

//si 

export const InsertarVentaRoute = venta => apiUser.put('/InsertarVentaRoute', venta)